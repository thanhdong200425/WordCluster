import { AppTheme } from "@/constants/appTheme";
import { Ionicons } from "@expo/vector-icons";
import { PressableFeedback } from "heroui-native/pressable-feedback";
import { Platform, StyleSheet, Text, View } from "react-native";

export interface FieldSectionHeaderProps {
  label: string;
  t: AppTheme;
  onDelete: () => void;
}

export function FieldSectionHeader({
  label,
  t,
  onDelete,
}: FieldSectionHeaderProps) {
  return (
    <View style={styles.row}>
      <Text style={[styles.label, { color: t.textFaint }]} numberOfLines={1}>
        {label}
      </Text>
      <PressableFeedback
        onPress={onDelete}
        accessibilityRole="button"
        accessibilityLabel={`Remove ${label}`}
        className="items-center justify-center rounded-full"
        style={styles.deleteBtn}
      >
        <Ionicons name="trash-outline" size={16} color={t.textMuted} />
      </PressableFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  label: {
    flex: 1,
    flexShrink: 1,
    fontSize: 9,
    fontWeight: "600",
    letterSpacing: 1,
    textTransform: "uppercase",
    lineHeight: 12,
    ...Platform.select({
      android: { includeFontPadding: false },
      default: {},
    }),
  },
  deleteBtn: {
    width: 28,
    height: 28,
    marginLeft: 8,
  },
});
