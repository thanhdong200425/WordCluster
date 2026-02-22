import Purchases, { CustomerInfo, LOG_LEVEL } from "react-native-purchases";
import { create } from "zustand";

interface RevenueCatStorage {
  isPro: boolean;
  customerInfo: CustomerInfo | null;
  isInitialized: boolean;
  setIsPro: (isPro: boolean) => void;
  setCustomerInfo: () => void;
  setIsInitialized: (isInitialized: boolean) => void;
  initialize: () => void;
}

const useRevenueCatStorage = create<RevenueCatStorage>((set) => ({
  isPro: false,
  customerInfo: null,
  isInitialized: false,
  setIsPro: (isPro: boolean) => set({ isPro }),
  setCustomerInfo: async () => {
    try {
      const customerInfo = await Purchases.getCustomerInfo();
      set({ customerInfo });
    } catch (error) {
      throw new Error("Error when fetching customer info: " + error);
    }
  },
  setIsInitialized: (isInitialized: boolean) => set({ isInitialized }),
  initialize: async () => {
    Purchases.setLogLevel(LOG_LEVEL.INFO);
    if (!process.env.EXPO_PUBLIC_RC_TEST_API_KEY) {
      set({ isInitialized: false });
      throw new Error("EXPO_PUBLIC_RC_API_KEY is not set");
    }
    Purchases.configure({
      apiKey: __DEV__ ? process.env.EXPO_PUBLIC_RC_TEST_API_KEY : "",
    });
    set({ isInitialized: true });
  },
}));

export default useRevenueCatStorage;
