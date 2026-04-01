import Purchases, { PurchasesPackage } from "react-native-purchases";

/**
 * Fetches the current offering and returns the best package for the paywall CTA.
 * Prefers monthly; falls back to the first available package.
 * Returns null when the offering is empty or misconfigured.
 */
export async function getPaywallPackage(): Promise<PurchasesPackage | null> {
  const offerings = await Purchases.getOfferings();
  const offering = offerings.current;

  if (!offering || offering.availablePackages.length === 0) {
    return null;
  }

  return offering.monthly ?? offering.availablePackages[0] ?? null;
}
