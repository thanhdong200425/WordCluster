import * as StoreReview from "expo-store-review";
import { Linking, Platform } from "react-native";

const ANDROID_PACKAGE = "com.dong.lexio";

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
 * Android falls back to the Play Store listing (reviews) when review is unavailable or fails.
 * Web: no-op. iOS: no store URL fallback until an App Store ID is configured.
 */
export async function requestAppRating(): Promise<void> {
  if (Platform.OS === "web") {
    return;
  }

  if (Platform.OS === "android") {
    try {
      if (await StoreReview.hasAction()) {
        await StoreReview.requestReview();
        return;
      }
    } catch {
      // ERR_STORE_REVIEW_FAILED or similar — open Play Store
      console.log("ERR_STORE_REVIEW_FAILED or similar — open Play Store");
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
