import { Text } from "@/components/ui/text";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Switch, View } from "react-native";

interface QuestionTypeToggleProps {
  icon: string;
  label: string;
  description: string;
  enhanced: boolean;
  enabled: boolean;
  available: boolean;
  onToggle: () => void;
}

export function QuestionTypeToggle({
  icon,
  label,
  description,
  enhanced,
  enabled,
  available,
  onToggle,
}: QuestionTypeToggleProps) {
  return (
    <Pressable
      onPress={available ? onToggle : undefined}
      style={[
        styles.container,
        enabled && available ? styles.containerActive : styles.containerInactive,
      ]}
      className="mx-5 mb-2.5 rounded-2xl px-4 py-3.5"
    >
      <View
        className="flex-row items-center justify-between"
        style={{ opacity: available ? 1 : 0.4 }}
      >
        <View className="mr-3 flex-1">
          <View className="mb-1 flex-row items-center gap-2">
            <Ionicons name={icon as keyof typeof Ionicons.glyphMap} size={18} color={enabled && available ? "#00bc7d" : "#6b7080"} />
            <Text
              className="font-bold"
              style={{
                fontSize: 14,
                color: enabled && available ? "#00bc7d" : "#a0a4b8",
              }}
            >
              {label}
            </Text>
            {enhanced && (
              <View style={styles.enhancedBadge} className="rounded px-1.5 py-0.5">
                <Text style={styles.enhancedText}>ENHANCED</Text>
              </View>
            )}
          </View>
          <Text style={{ fontSize: 11, color: "#6b7080" }}>
            {available ? description : "Not available for this set"}
          </Text>
        </View>

        <Switch
          value={enabled && available}
          onValueChange={available ? onToggle : undefined}
          disabled={!available}
          trackColor={{
            false: "rgba(255,255,255,0.08)",
            true: "#00bc7d",
          }}
          thumbColor="#fff"
          ios_backgroundColor="rgba(255,255,255,0.08)"
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1.5,
  },
  containerActive: {
    backgroundColor: "rgba(0,188,125,0.06)",
    borderColor: "rgba(0,188,125,0.15)",
  },
  containerInactive: {
    backgroundColor: "rgba(255,255,255,0.02)",
    borderColor: "rgba(255,255,255,0.05)",
  },
  enhancedBadge: {
    backgroundColor: "rgba(0,188,125,0.15)",
  },
  enhancedText: {
    fontSize: 8,
    fontWeight: "800",
    color: "#00bc7d",
  },
});
