import { TestIds } from "react-native-google-mobile-ads";

const IS_DEV = __DEV__;

const PRODUCTION_NATIVE_AD_UNIT_ID = "ca-app-pub-6186120243131894/4928829675";

export const AdUnitIds = {
  NATIVE: IS_DEV ? TestIds.NATIVE : PRODUCTION_NATIVE_AD_UNIT_ID,
};
