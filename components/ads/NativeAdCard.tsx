import { Text } from "@/components/ui/text";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import { Image, Platform, View } from "react-native";
import {
  NativeAd,
  NativeAdView,
  NativeAsset,
  NativeAssetType,
  TestIds,
} from "react-native-google-mobile-ads";

export function NativeAdCard() {
  const [nativeAd, setNativeAd] = useState<NativeAd>();

  useEffect(() => {
    if (Platform.OS === "web") return;

    NativeAd.createForAdRequest(TestIds.NATIVE)
      .then(setNativeAd)
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!nativeAd) return;
    return () => {
      nativeAd.destroy();
    };
  }, [nativeAd]);

  if (Platform.OS === "web" || !nativeAd) return null;

  return (
    <NativeAdView nativeAd={nativeAd}>
      <View className="flex-row items-center border-t border-[#1e2028] bg-[#13141a] px-3 py-2.5">
        <AdIcon url={nativeAd.icon?.url} />
        <AdContent headline={nativeAd.headline} body={nativeAd.body} />
        <AdCtaButton label={nativeAd.callToAction} />
        <Text className="absolute right-3 top-1.5 text-[9px] font-medium tracking-widest text-[#6b7280]">
          AD
        </Text>
      </View>
    </NativeAdView>
  );
}

function AdIcon({ url }: { url?: string }) {
  return (
    <NativeAsset assetType={NativeAssetType.ICON}>
      {url ? (
        <Image
          source={{ uri: url }}
          style={{ width: 36, height: 36, borderRadius: 10 }}
        />
      ) : (
        <LinearGradient
          colors={["#f59e0b", "#ef4444"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text className="text-base text-white">★</Text>
        </LinearGradient>
      )}
    </NativeAsset>
  );
}

function AdContent({
  headline,
  body,
}: {
  headline?: string | null;
  body?: string | null;
}) {
  return (
    <View className="mx-3 flex-1">
      <NativeAsset assetType={NativeAssetType.HEADLINE}>
        <Text className="text-xs font-semibold text-white" numberOfLines={1}>
          {headline ?? "Sponsored"}
        </Text>
      </NativeAsset>
      {body ? (
        <NativeAsset assetType={NativeAssetType.BODY}>
          <Text className="text-[11px] text-[#9ca3af]" numberOfLines={1}>
            {body}
          </Text>
        </NativeAsset>
      ) : null}
    </View>
  );
}

function AdCtaButton({ label }: { label?: string | null }) {
  if (!label) return null;

  return (
    <NativeAsset assetType={NativeAssetType.CALL_TO_ACTION}>
      <LinearGradient
        colors={["#f59e0b", "#ef4444"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          borderRadius: 10,
          paddingHorizontal: 14,
          paddingVertical: 6,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text className="text-xs font-bold text-white">{label}</Text>
      </LinearGradient>
    </NativeAsset>
  );
}
