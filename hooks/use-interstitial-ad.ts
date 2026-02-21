import { AdUnitIds } from "@/constants/ads";
import { useCallback, useEffect, useRef } from "react";
import { Platform, StatusBar } from "react-native";
import {
  AdEventType,
  InterstitialAd,
} from "react-native-google-mobile-ads";

const AD_COOLDOWN_MS = 3 * 60 * 1000;

let lastAdShownAt = 0;

function isCooldownElapsed() {
  return Date.now() - lastAdShownAt >= AD_COOLDOWN_MS;
}

export function useInterstitialAd() {
  const loadedRef = useRef(false);
  const pendingShowRef = useRef(false);
  const adRef = useRef<InterstitialAd | null>(null);

  useEffect(() => {
    if (Platform.OS === "web") return;

    const interstitial = InterstitialAd.createForAdRequest(
      AdUnitIds.INTERSTITIAL,
    );
    adRef.current = interstitial;

    const unsubLoaded = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => {
        loadedRef.current = true;
        if (pendingShowRef.current && isCooldownElapsed()) {
          pendingShowRef.current = false;
          lastAdShownAt = Date.now();
          interstitial.show();
        }
      },
    );

    const unsubOpened = interstitial.addAdEventListener(
      AdEventType.OPENED,
      () => {
        if (Platform.OS === "ios") StatusBar.setHidden(true);
      },
    );

    const unsubClosed = interstitial.addAdEventListener(
      AdEventType.CLOSED,
      () => {
        if (Platform.OS === "ios") StatusBar.setHidden(false);
        loadedRef.current = false;
        interstitial.load();
      },
    );

    interstitial.load();

    return () => {
      unsubLoaded();
      unsubOpened();
      unsubClosed();
      adRef.current = null;
      loadedRef.current = false;
      pendingShowRef.current = false;
    };
  }, []);

  const showIfReady = useCallback(() => {
    if (Platform.OS === "web") return;
    if (!isCooldownElapsed()) return;

    if (loadedRef.current && adRef.current) {
      lastAdShownAt = Date.now();
      adRef.current.show();
      return;
    }

    // Ad still loading — show it once the LOADED event fires
    pendingShowRef.current = true;
  }, []);

  return { showIfReady };
}
