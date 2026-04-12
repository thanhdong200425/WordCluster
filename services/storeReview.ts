import AsyncStorage from "@react-native-async-storage/async-storage";
import * as StoreReview from "expo-store-review";
import { Linking, Platform } from "react-native";

const ANDROID_PACKAGE = "com.dong.lexio";
/** After one in-app attempt, always open Play Store (Google often shows the sheet only once). */
const ANDROID_IN_APP_REVIEW_USED_KEY = "@lexio/android_in_app_review_used";

async function wasAndroidInAppReviewAlreadyAttempted(): Promise<boolean> {
  try {
    return (await AsyncStorage.getItem(ANDROID_IN_APP_REVIEW_USED_KEY)) === "1";
  } catch {
    return false;
  }
}

async function markAndroidInAppReviewAttempted(): Promise<void> {
  try {
    await AsyncStorage.setItem(ANDROID_IN_APP_REVIEW_USED_KEY, "1");
  } catch {
    // non-fatal
  }
}

async function openAndroidPlayStoreReviews(): Promise<void> {
  const market = `market://details?id=${ANDROID_PACKAGE}&showAllReviews=true`;
  const https = `https://play.google.com/store/apps/details?id=${ANDROID_PACKAGE}&showAllReviews=true`;
  try {
    if (await Linking.canOpenURL(market)) {
      await Linking.openURL(market);
      return;
    }
  } catch {
    // fall through to https
  }
  await Linking.openURL(https);
}

/**
 * Opens the native in-app review flow when available.
 * Android: first eligible tap uses in-app review; later taps open the Play Store (in-app is
 * often a no-op after the first successful API call due to Play quotas). Errors open the store.
 * Web: no-op. iOS: no store URL fallback until an App Store ID is configured.
 */
export async function requestAppRating(): Promise<void> {
  if (Platform.OS === "web") {
    return;
  }

  if (Platform.OS === "android") {
    const wasAttempted = await wasAndroidInAppReviewAlreadyAttempted();
    if (wasAttempted) {
      await openAndroidPlayStoreReviews();
      return;
    }

    try {
      if (await StoreReview.hasAction()) {
        await markAndroidInAppReviewAttempted();
        await StoreReview.requestReview();
        return;
      }
    } catch {
      await openAndroidPlayStoreReviews();
      return;
    }
    await openAndroidPlayStoreReviews();
    return;
  }

  try {
    if (await StoreReview.hasAction()) {
      await StoreReview.requestReview();
    }
  } catch {
    // No App Store write-review URL without ios.appStoreUrl / numeric id
  }
}
