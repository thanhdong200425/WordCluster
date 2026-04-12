import { usePaywallOfferings } from "@/hooks/use-paywall-offerings";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Check, Crown } from "lucide-react-native";
import { useCallback, type RefObject } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const BENEFITS = ["Unlimited terms per set", "Unlimited study & test sessions"];

interface ProUpsellSheetProps {
  sheetRef: RefObject<BottomSheetModal | null>;
  title: string;
  description: string;
  onGetPro?: () => void;
}

export function ProUpsellSheet({
  sheetRef,
  title,
  description,
  onGetPro,
}: ProUpsellSheetProps) {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { pkg } = usePaywallOfferings();

  const priceString = pkg?.product.priceString ?? "$2.99";

  const handleGetPro = () => {
    sheetRef.current?.dismiss();
    if (onGetPro) {
      onGetPro();
    } else {
      router.push("/paywall");
    }
  };

  const handleDismiss = () => {
    sheetRef.current?.dismiss();
  };

  const renderBackdrop = useCallback(
    (props: Parameters<typeof BottomSheetBackdrop>[0]) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.6}
      />
    ),
    [],
  );

  return (
    <BottomSheetModal
      ref={sheetRef}
      enableDynamicSizing
      backdropComponent={renderBackdrop}
      backgroundStyle={styles.sheetBg}
      handleIndicatorStyle={styles.handle}
    >
      <BottomSheetView
        style={[styles.container, { paddingBottom: insets.bottom + 16 }]}
      >
        {/* Header row: crown icon + title/description */}
        <View style={styles.headerRow}>
          <LinearGradient
            colors={["#5B6BF8", "#4B5BF0"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.iconContainer}
          >
            <Crown size={26} color="#FFFFFF" />
          </LinearGradient>

          <View style={styles.headerText}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
          </View>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Benefits list */}
        <View style={styles.benefits}>
          {BENEFITS.map((benefit) => (
            <View key={benefit} style={styles.benefitRow}>
              <View style={styles.checkBadge}>
                <Check size={10} color="#FFFFFF" strokeWidth={3} />
              </View>
              <Text style={styles.benefitText}>{benefit}</Text>
            </View>
          ))}
        </View>

        {/* Price pill */}
        <View style={styles.pricePill}>
          <Text style={styles.priceLabel}>Lexio Pro</Text>
          <Text style={styles.priceDot}>·</Text>
          <Text style={styles.priceValue}>{priceString}</Text>
          <Text style={styles.pricePeriod}> / month</Text>
          <View style={styles.cancelChip}>
            <Text style={styles.cancelText}>CANCEL ANYTIME</Text>
          </View>
        </View>

        {/* CTA button */}
        <Pressable
          onPress={handleGetPro}
          style={({ pressed }) => pressed && styles.pressed}
        >
          <LinearGradient
            colors={["#5B6BF8", "#4B5BF0"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.ctaButton}
          >
            <Crown size={18} color="#FFFFFF" />
            <Text style={styles.ctaText}>Get Pro</Text>
          </LinearGradient>
        </Pressable>

        {/* Maybe later */}
        <Pressable
          onPress={handleDismiss}
          style={({ pressed }) => [
            styles.laterButton,
            pressed && styles.pressed,
          ]}
        >
          <Text style={styles.laterText}>Maybe later</Text>
        </Pressable>
      </BottomSheetView>
    </BottomSheetModal>
  );
}

const styles = StyleSheet.create({
  sheetBg: {
    backgroundColor: "#0F1015",
  },
  handle: {
    backgroundColor: "#2A2D3A",
    width: 36,
  },
  container: {
    paddingHorizontal: 24,
    paddingTop: 8,
    gap: 16,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    paddingTop: 8,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#5B6BF8",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 8,
  },
  headerText: {
    flex: 1,
    gap: 3,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 19,
    fontWeight: "700",
    letterSpacing: -0.4,
    lineHeight: 28.5,
  },
  description: {
    color: "#9CA3AF",
    fontSize: 13,
    lineHeight: 18.85,
  },
  divider: {
    height: 1,
    backgroundColor: "#1E2028",
  },
  benefits: {
    gap: 12,
  },
  benefitRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  checkBadge: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#5B6BF8",
    alignItems: "center",
    justifyContent: "center",
  },
  benefitText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 21,
  },
  pricePill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#252832",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 8,
    gap: 4,
  },
  priceLabel: {
    color: "#9CA3AF",
    fontSize: 13,
    fontWeight: "600",
  },
  priceDot: {
    color: "#3A3D4E",
    fontSize: 13,
  },
  priceValue: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
  },
  pricePeriod: {
    color: "#9CA3AF",
    fontSize: 13,
    flex: 1,
  },
  cancelChip: {
    backgroundColor: "rgba(91,107,248,0.12)",
    borderRadius: 6,
    paddingHorizontal: 7,
    paddingVertical: 2.5,
  },
  cancelText: {
    color: "#5B6BF8",
    fontSize: 10,
    fontWeight: "600",
    letterSpacing: 0.4,
  },
  ctaButton: {
    height: 54,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    shadowColor: "#5B6BF8",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 24,
    elevation: 8,
  },
  ctaText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: -0.2,
  },
  laterButton: {
    alignItems: "center",
    paddingVertical: 8,
  },
  laterText: {
    color: "#6B7280",
    fontSize: 13,
    lineHeight: 19.5,
  },
  pressed: {
    opacity: 0.7,
  },
});
