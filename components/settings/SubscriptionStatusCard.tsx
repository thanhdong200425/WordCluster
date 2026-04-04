import { AppTheme } from "@/constants/appTheme";
import { LinearGradient } from "expo-linear-gradient";
import { Crown } from "lucide-react-native";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface SubscriptionStatusCardProps {
  t: AppTheme;
  renewalDateLabel: string | null;
  pricePerMonthLabel: string | null;
  onManagePress: () => void;
}

export function SubscriptionStatusCard({
  t,
  renewalDateLabel,
  pricePerMonthLabel,
  onManagePress,
}: SubscriptionStatusCardProps) {
  const subtitle = buildSubtitle(renewalDateLabel, pricePerMonthLabel);

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: t.surface, borderColor: t.border2 },
      ]}
    >
      {/* Left gold accent bar */}
      <LinearGradient
        colors={[t.proGradientStart, t.proGradientEnd]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.accentBar}
      />

      {/* Content row */}
      <View style={styles.row}>
        {/* Gold crown icon */}
        <LinearGradient
          colors={[t.proGradientStart, t.proGradientEnd]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[
            styles.iconCircle,
            {
              shadowColor: t.proAccent,
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.35,
              shadowRadius: 12,
              elevation: 6,
            },
          ]}
        >
          <Crown size={20} color="#FFFFFF" strokeWidth={2} />
        </LinearGradient>

        {/* Text block */}
        <View style={styles.textBlock}>
          {/* Title + ACTIVE chip */}
          <View style={styles.titleRow}>
            <Text style={[styles.title, { color: t.text }]}>Lexio Pro</Text>
            <View style={[styles.activeChip, { backgroundColor: t.proChipBg }]}>
              <Text style={[styles.activeLabel, { color: t.proAccent }]}>
                ACTIVE
              </Text>
            </View>
          </View>

          {/* Subtitle */}
          {subtitle ? (
            <Text style={[styles.subtitle, { color: t.textMuted }]}>
              {subtitle}
            </Text>
          ) : null}
        </View>

        {/* Manage */}
        <Pressable
          onPress={onManagePress}
          hitSlop={8}
          style={({ pressed }) => pressed && styles.pressed}
        >
          <Text style={[styles.manageLabel, { color: t.accentStart }]}>
            Manage
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

function buildSubtitle(
  renewalDate: string | null,
  price: string | null,
): string | null {
  if (renewalDate && price) return `Renews ${renewalDate} · ${price}/mo`;
  if (renewalDate) return `Renews ${renewalDate}`;
  return null;
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    overflow: "hidden",
  },
  accentBar: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingLeft: 22,
    paddingRight: 18,
    paddingVertical: 16,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  textBlock: {
    flex: 1,
    gap: 2,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  title: {
    fontSize: 15,
    fontWeight: "700",
    letterSpacing: -0.3,
  },
  activeChip: {
    borderRadius: 6,
    paddingHorizontal: 7,
    paddingVertical: 2,
  },
  activeLabel: {
    fontSize: 10,
    fontWeight: "600",
    letterSpacing: 0.4,
  },
  subtitle: {
    fontSize: 13,
    fontWeight: "400",
    lineHeight: 19.5,
  },
  manageLabel: {
    fontSize: 13,
    fontWeight: "500",
  },
  pressed: {
    opacity: 0.6,
  },
});
