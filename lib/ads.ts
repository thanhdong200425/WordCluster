import mobileAds from "react-native-google-mobile-ads";

export async function initializeAds() {
  await mobileAds().setRequestConfiguration({
    tagForChildDirectedTreatment: false,
    tagForUnderAgeOfConsent: false,
    testDeviceIdentifiers: __DEV__ ? ["EMULATOR"] : [],
  });

  await mobileAds().initialize();
}
