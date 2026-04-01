import useRevenueCatStorage from "@/stores/revenueCatStorage";
import Purchases, {
  PurchasesError,
  PurchasesPackage,
} from "react-native-purchases";

async function syncCustomerInfo() {
  await useRevenueCatStorage.getState().refreshCustomerInfo();
}

function isCancellation(error: unknown): boolean {
  const rcError = error as Partial<PurchasesError>;
  return (
    rcError.code === Purchases.PURCHASES_ERROR_CODE.PURCHASE_CANCELLED_ERROR
  );
}

/** Resolves on success or user cancel; throws on other failures. */
export async function purchasePackage(pkg: PurchasesPackage): Promise<void> {
  try {
    await Purchases.purchasePackage(pkg);
    await syncCustomerInfo();
  } catch (error: unknown) {
    if (isCancellation(error)) return;
    throw error;
  }
}

export async function restorePurchases(): Promise<void> {
  await Purchases.restorePurchases();
  await syncCustomerInfo();
}
