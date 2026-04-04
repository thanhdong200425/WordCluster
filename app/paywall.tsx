import { PaywallComparisonTable } from "@/components/paywall/PaywallComparisonTable";
import { PaywallFooter } from "@/components/paywall/PaywallFooter";
import { PaywallHeader } from "@/components/paywall/PaywallHeader";
import { PaywallHero } from "@/components/paywall/PaywallHero";
import { useAppTheme } from "@/constants/appTheme";
import { useActiveSubscription } from "@/hooks/use-active-subscription";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { usePaywallOfferings } from "@/hooks/use-paywall-offerings";
import { useFocusEffect, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useCallback } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function PaywallScreen() {
  const router = useRouter();
  const t = useAppTheme();
  const scheme = useColorScheme();
  const insets = useSafeAreaInsets();
  const { pkg, loading, error, ctaLabel, refetch } = usePaywallOfferings();
  const { hasActiveSubscription, loadingSubscription, refetchSubscription } =
    useActiveSubscription();

  useFocusEffect(
    useCallback(() => {
      refetchSubscription();
    }, [refetchSubscription]),
  );

  return (
    <>
      <StatusBar style={scheme === "dark" ? "light" : "dark"} />
      <View
        style={[
          styles.cardShell,
          { backgroundColor: t.bg, paddingTop: insets.top * 0.2 },
        ]}
      >
        <PaywallHeader t={t} onBack={() => router.back()} />

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <PaywallHero t={t} />
          <PaywallComparisonTable t={t} />
        </ScrollView>

        <PaywallFooter
          t={t}
          pkg={pkg}
          ctaLabel={ctaLabel}
          loading={loading || loadingSubscription}
          error={error}
          onRetry={refetch}
          hasActiveSubscription={hasActiveSubscription}
          onPurchaseSuccess={refetchSubscription}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  cardShell: {
    flex: 1,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    overflow: "hidden",
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 20,
  },
});
