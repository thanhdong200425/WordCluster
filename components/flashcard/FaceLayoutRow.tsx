import { Text } from "@/components/ui/text";
import { useAppTheme } from "@/constants/appTheme";
import { FIELD_LABEL, FieldId } from "@/stores/flashcardLayoutStore";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable, StyleSheet, View } from "react-native";

interface FaceLayoutRowProps {
  field: FieldId;
  isEnabled: boolean;
  isPrimary: boolean;
  isLast: boolean;
  onPress: () => void;
}

export function FaceLayoutRow({
  field,
  isEnabled,
  isPrimary,
  isLast,
  onPress,
}: FaceLayoutRowProps) {
  const theme = useAppTheme();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.row,
        !isLast && {
          borderBottomWidth: StyleSheet.hairlineWidth,
          borderBottomColor: "rgba(0,0,0,0.10)",
        },
        pressed && { opacity: 0.7 },
      ]}
    >
      {isEnabled ? (
        <LinearGradient
          colors={[theme.accentStart, theme.accentEnd]}
          start={[0, 0]}
          end={[1, 1]}
          style={styles.checkbox}
        >
          <Ionicons name="checkmark" size={11} color="#fff" />
        </LinearGradient>
      ) : (
        <View
          style={[
            styles.checkbox,
            {
              backgroundColor: theme.surface2,
              borderWidth: 1,
              borderColor: theme.border,
            },
          ]}
        />
      )}

      <Text
        style={[
          styles.label,
          { color: isEnabled ? theme.text : theme.textMuted },
        ]}
      >
        {FIELD_LABEL[field]}
      </Text>

      {isPrimary ? (
        <View
          style={[styles.primaryBadge, { backgroundColor: theme.accentSurface }]}
        >
          <Text style={[styles.primaryText, { color: theme.accentStart }]}>
            PRIMARY
          </Text>
        </View>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    height: 36,
    paddingHorizontal: 2,
    gap: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    flex: 1,
    fontSize: 13,
    fontWeight: "500",
  },
  primaryBadge: {
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  primaryText: {
    fontSize: 10,
    fontWeight: "600",
    letterSpacing: 0.6,
  },
});
