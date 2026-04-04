import { RC_PRO_ENTITLEMENT } from "@/constants/revenuecat";
import { useCallback, useEffect, useState } from "react";
import Purchases from "react-native-purchases";

interface ActiveSubscriptionState {
  hasActiveSubscription: boolean;
  loadingSubscription: boolean;
  refetchSubscription: () => Promise<void>;
}

export function useActiveSubscription(): ActiveSubscriptionState {
  const [hasActiveSubscription, setHasActiveSubscription] = useState(false);
  const [loadingSubscription, setLoadingSubscription] = useState(true);

  const refetchSubscription = useCallback(async () => {
    setLoadingSubscription(true);
    try {
      const customerInfo = await Purchases.getCustomerInfo();
      setHasActiveSubscription(
        typeof customerInfo.entitlements.active[RC_PRO_ENTITLEMENT] !==
          "undefined",
      );
    } catch {
      setHasActiveSubscription(false);
    } finally {
      setLoadingSubscription(false);
    }
  }, []);

  useEffect(() => {
    refetchSubscription();
  }, [refetchSubscription]);

  return { hasActiveSubscription, loadingSubscription, refetchSubscription };
}
