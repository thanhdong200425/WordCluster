import { AppTheme } from "@/constants/appTheme";
import { Check, X } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";
import { PaywallRow, PaywallRowValue, paywallRows } from "./paywallTableData";

interface PaywallComparisonTableProps {
  t: AppTheme;
}

export function PaywallComparisonTable({ t }: PaywallComparisonTableProps) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <Text style={[styles.freeHeader, { color: t.textFaint }]}>FREE</Text>
        <View style={[styles.proPill, { backgroundColor: t.accentSurface }]}>
          <Text style={[styles.proHeader, { color: t.accentStart }]}>PRO</Text>
        </View>
      </View>

      <View style={[styles.card, { backgroundColor: t.surface, borderColor: t.border }]}>
        {paywallRows.map((row, index) => {
          const hasDivider = index !== paywallRows.length - 1;
          return (
            <FeatureRow
              key={row.label}
              row={row}
              t={t}
              withDivider={hasDivider}
            />
          );
        })}
      </View>
    </View>
  );
}

interface FeatureRowProps {
  row: PaywallRow;
  t: AppTheme;
  withDivider: boolean;
}

function FeatureRow({ row, t, withDivider }: FeatureRowProps) {
  return (
    <View
      style={[
        styles.row,
        withDivider && {
          borderBottomWidth: 0.5,
          borderBottomColor: t.border,
        },
      ]}
    >
      <Text style={[styles.featureText, { color: t.text }]}>{row.label}</Text>
      <View style={styles.valueColumns}>
        <ValueCell value={row.free} color={t.textMuted} isPro={false} />
        <ValueCell value={row.pro} color={t.accentStart} isPro />
      </View>
    </View>
  );
}

interface ValueCellProps {
  value: PaywallRowValue;
  color: string;
  isPro: boolean;
}

function ValueCell({ value, color, isPro }: ValueCellProps) {
  if (value.kind === "icon") {
    if (value.value === "check") {
      return (
        <View style={styles.iconCell}>
          <Check size={18} color={isPro ? color : "#9CA3AF"} strokeWidth={2.5} />
        </View>
      );
    }
    return (
      <View style={styles.iconCell}>
        <X size={18} color="#9CA3AF" strokeWidth={2.5} />
      </View>
    );
  }

  return (
    <View style={styles.textCell}>
      <Text
        style={[
          styles.valueText,
          { color, fontWeight: isPro ? "600" : "500" },
        ]}
        numberOfLines={2}
      >
        {value.value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: 10,
  },
  header: {
    height: 26,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingRight: 8,
    gap: 12,
  },
  freeHeader: {
    width: 80,
    textAlign: "center",
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 0.8,
  },
  proPill: {
    width: 80,
    height: 26,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },
  proHeader: {
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 0.8,
  },
  card: {
    borderRadius: 18,
    borderWidth: 0.5,
    overflow: "hidden",
  },
  row: {
    minHeight: 48,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  featureText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: -0.1,
    paddingRight: 8,
  },
  valueColumns: {
    width: 160,
    flexDirection: "row",
  },
  textCell: {
    width: 80,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
  },
  iconCell: {
    width: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  valueText: {
    textAlign: "center",
    fontSize: 12,
    lineHeight: 18,
  },
});
