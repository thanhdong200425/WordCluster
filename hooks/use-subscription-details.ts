import { RC_PRO_ENTITLEMENT } from "@/constants/revenuecat";
import { getPaywallPackage } from "@/services/revenuecatOfferings";
import useRevenueCatStorage from "@/stores/revenueCatStorage";
import { useCallback, useEffect, useState } from "react";
import Purchases from "react-native-purchases";

interface SubscriptionDetails {
  isPro: boolean;
  loading: boolean;
  renewalDateLabel: string | null;
  pricePerMonthLabel: string | null;
  refetch: () => Promise<void>;
}

function formatExpirationDate(isoDate: string | null): string | null {
  if (!isoDate) return null;
  try {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date(isoDate));
  } catch {
    return null;
  }
}

export function useSubscriptionDetails(): SubscriptionDetails {
  const isInitialized = useRevenueCatStorage((s) => s.isInitialized);
  const [isPro, setIsPro] = useState(false);
  const [loading, setLoading] = useState(true);
  const [renewalDateLabel, setRenewalDateLabel] = useState<string | null>(null);
  const [pricePerMonthLabel, setPricePerMonthLabel] = useState<string | null>(
    null,
  );

  const refetch = useCallback(async () => {
    if (!isInitialized) return;
    setLoading(true);
    try {
      const [customerInfo, pkg] = await Promise.all([
        Purchases.getCustomerInfo(),
        getPaywallPackage().catch(() => null),
      ]);

      const entitlement = customerInfo.entitlements.active[RC_PRO_ENTITLEMENT];
      const active = entitlement !== undefined;
      setIsPro(active);

      if (active) {
        const formatted = formatExpirationDate(
          entitlement.expirationDate ?? null,
        );
        setRenewalDateLabel(formatted);
      } else {
        setRenewalDateLabel(null);
      }

      setPricePerMonthLabel(pkg?.product.priceString ?? null);
    } catch {
      setIsPro(false);
      setRenewalDateLabel(null);
    } finally {
      setLoading(false);
    }
  }, [isInitialized]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { isPro, loading, renewalDateLabel, pricePerMonthLabel, refetch };
}
