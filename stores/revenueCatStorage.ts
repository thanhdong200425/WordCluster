import Purchases, { CustomerInfo, LOG_LEVEL } from "react-native-purchases";
import { create } from "zustand";

export const RC_PRO_ENTITLEMENT = "pro";

// const TEST_API_KEY = process.env.EXPO_PUBLIC_RC_TEST_API_KEY ?? "";
const PROD_API_KEY = process.env.EXPO_PUBLIC_RC_PLAY_STORE_API_KEY ?? "";

function resolveApiKey(): string {
  return PROD_API_KEY;
}

function deriveIsPro(info: CustomerInfo): boolean {
  return RC_PRO_ENTITLEMENT in info.entitlements.active;
}

interface RevenueCatStorage {
  isPro: boolean;
  customerInfo: CustomerInfo | null;
  isInitialized: boolean;
  setIsPro: (isPro: boolean) => void;
  refreshCustomerInfo: () => Promise<void>;
  setIsInitialized: (isInitialized: boolean) => void;
  initialize: () => Promise<void>;
}

const useRevenueCatStorage = create<RevenueCatStorage>((set) => ({
  isPro: false,
  customerInfo: null,
  isInitialized: false,
  setIsPro: (isPro: boolean) => set({ isPro }),
  refreshCustomerInfo: async () => {
    try {
      const customerInfo = await Purchases.getCustomerInfo();
      set({ customerInfo, isPro: deriveIsPro(customerInfo) });
    } catch (error) {
      throw new Error("Error when fetching customer info: " + error);
    }
  },
  setIsInitialized: (isInitialized: boolean) => set({ isInitialized }),
  initialize: async () => {
    const apiKey = resolveApiKey();
    if (!apiKey) {
      set({ isInitialized: false });
      throw new Error(
        "No RevenueCat API key found. Set EXPO_PUBLIC_RC_TEST_API_KEY (dev) or EXPO_PUBLIC_RC_API_KEY (prod).",
      );
    }
    Purchases.setLogLevel(LOG_LEVEL.INFO);
    Purchases.configure({ apiKey });
    set({ isInitialized: true });
  },
}));

export default useRevenueCatStorage;
