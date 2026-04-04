import { AppTheme } from "@/constants/appTheme";
import { purchasePackage, restorePurchases } from "@/services/purchasing";
import { LinearGradient } from "expo-linear-gradient";
import * as WebBrowser from "expo-web-browser";
import { useToast } from "heroui-native";
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";
import { PurchasesPackage } from "react-native-purchases";

const PRIVACY_POLICY_URL =
  "https://thanhdong200425.github.io/WordCluster/public/privacy.html";
const TERMS_OF_SERVICE_URL =
  "https://thanhdong200425.github.io/WordCluster/public/terms.html";

interface PaywallFooterProps {
  t: AppTheme;
  pkg: PurchasesPackage | null;
  ctaLabel: string;
  loading: boolean;
  error: string | null;
  onRetry: () => void;
  hasActiveSubscription?: boolean;
  onPurchaseSuccess?: () => Promise<void>;
}

export function PaywallFooter({
  t,
  pkg,
  ctaLabel,
  loading,
  error,
  onRetry,
  hasActiveSubscription = false,
  onPurchaseSuccess,
}: PaywallFooterProps) {
  const { toast } = useToast();
  const isDisabled = loading || (!pkg && !error) || hasActiveSubscription;

  const handleCta = async () => {
    if (error) {
      onRetry();
      return;
    }
    if (!pkg) return;
    try {
      await purchasePackage(pkg);
      await onPurchaseSuccess?.();
    } catch {
      toast.show({
        variant: "danger",
        label: "Purchase failed",
        description: "Something went wrong. Please try again.",
      });
    }
  };

  const handleRestore = async () => {
    try {
      await restorePurchases();
      toast.show({
        variant: "success",
        label: "Restored",
        description: "Your purchases have been restored.",
      });
    } catch {
      toast.show({
        variant: "danger",
        label: "Restore failed",
        description: "Could not restore purchases. Please try again.",
      });
    }
  };

  return (
    <View style={[styles.container, { borderTopColor: t.border }]}>
      <Pressable
        onPress={handleCta}
        disabled={isDisabled}
        style={[styles.ctaPressable, isDisabled && styles.ctaDisabled]}
      >
        <LinearGradient
          colors={["#5B6BF8", "#4B5BF0"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.ctaGradient}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.ctaText}>
              {hasActiveSubscription ? "Already Subscribed" : ctaLabel}
            </Text>
          )}
        </LinearGradient>
      </Pressable>

      <View style={styles.linksRow}>
        <FooterLink label="Restore Purchase" onPress={handleRestore} t={t} />
        <Text style={[styles.dot, { color: t.textFaint }]}>·</Text>
        <FooterLink
          label="Terms of Service"
          onPress={() => WebBrowser.openBrowserAsync(TERMS_OF_SERVICE_URL)}
          t={t}
        />
        <Text style={[styles.dot, { color: t.textFaint }]}>·</Text>
        <FooterLink
          label="Privacy Policy"
          onPress={() => WebBrowser.openBrowserAsync(PRIVACY_POLICY_URL)}
          t={t}
        />
      </View>

      <Text style={[styles.disclaimer, { color: t.textFaint }]}>
        Cancel anytime. Billed monthly.
      </Text>
    </View>
  );
}

interface FooterLinkProps {
  label: string;
  onPress: () => void;
  t: AppTheme;
}

function FooterLink({ label, onPress, t }: FooterLinkProps) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => pressed && { opacity: 0.7 }}>
      <Text style={[styles.linkText, { color: t.textFaint }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 14,
    paddingHorizontal: 20,
    paddingBottom: 24,
    borderTopWidth: 0.5,
    gap: 12,
  },
  ctaPressable: {
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#5B6BF8",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 14,
    elevation: 6,
  },
  ctaDisabled: {
    opacity: 0.6,
  },
  ctaGradient: {
    height: 56,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  ctaText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: -0.2,
  },
  linksRow: {
    minHeight: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 8,
  },
  linkText: {
    fontSize: 12,
    lineHeight: 18,
  },
  dot: {
    opacity: 0.5,
    fontSize: 16,
    lineHeight: 20,
    marginTop: -2,
  },
  disclaimer: {
    textAlign: "center",
    fontSize: 11,
    lineHeight: 16.5,
    opacity: 0.8,
  },
});
