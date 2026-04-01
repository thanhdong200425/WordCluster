import { getPaywallPackage } from "@/services/revenuecatOfferings";
import useRevenueCatStorage from "@/stores/revenueCatStorage";
import { useCallback, useEffect, useState } from "react";
import { PurchasesPackage } from "react-native-purchases";

interface PaywallOfferingsState {
  loading: boolean;
  error: string | null;
  pkg: PurchasesPackage | null;
  ctaLabel: string;
  refetch: () => void;
}

function buildCtaLabel(
  loading: boolean,
  error: string | null,
  pkg: PurchasesPackage | null,
): string {
  if (loading) return "Loading…";
  if (pkg) return `Get Pro — ${pkg.product.priceString} / month`;
  if (error) return "Retry";
  return "Unavailable";
}

export function usePaywallOfferings(): PaywallOfferingsState {
  const isInitialized = useRevenueCatStorage((s) => s.isInitialized);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pkg, setPkg] = useState<PurchasesPackage | null>(null);

  const fetch = useCallback(async () => {
    if (!isInitialized) return;
    setLoading(true);
    setError(null);
    try {
      const result = await getPaywallPackage();
      setPkg(result);
    } catch {
      setError("Failed to load pricing. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [isInitialized]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return {
    loading,
    error,
    pkg,
    ctaLabel: buildCtaLabel(loading, error, pkg),
    refetch: fetch,
  };
}
