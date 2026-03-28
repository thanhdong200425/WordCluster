import { AppTheme } from "@/constants/appTheme";
import { ChevronRight, type LucideIcon } from "lucide-react-native";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface SettingsMenuItemProps {
  icon: LucideIcon;
  label: string;
  onPress: () => void;
  t: AppTheme;
  showBorder?: boolean;
}

export function SettingsMenuItem({
  icon: Icon,
  label,
  onPress,
  t,
  showBorder = true,
}: SettingsMenuItemProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.row,
        showBorder && { borderBottomWidth: 0.5, borderBottomColor: t.border },
        pressed && { opacity: 0.7 },
      ]}
    >
      <View style={styles.left}>
        <Icon size={20} color={t.textMuted} />
        <Text style={[styles.label, { color: t.text }]}>{label}</Text>
      </View>
      <ChevronRight size={16} color={t.textFaint} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 18,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  label: {
    fontSize: 17,
    fontWeight: "400",
  },
});
