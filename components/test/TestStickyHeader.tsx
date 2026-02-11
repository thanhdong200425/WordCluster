import { TestTimer } from "@/components/test/TestTimer";
import { Text } from "@/components/ui/text";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, View } from "react-native";

interface TestStickyHeaderProps {
  answered: number;
  total: number;
  timerMinutes: number;
  onTimeUp: () => void;
  onCancel: () => void;
}

export function TestStickyHeader({
  answered,
  total,
  timerMinutes,
  onTimeUp,
  onCancel,
}: TestStickyHeaderProps) {
  const progress = total > 0 ? answered / total : 0;

  return (
    <View style={styles.container} className="flex-row items-center px-4 py-3">
      <Pressable onPress={onCancel} className="mr-3">
        <Ionicons name="close" size={22} color="#6b7080" />
      </Pressable>

      <Text
        className="mr-3 font-bold"
        style={{ fontSize: 11, color: "#a0a4b8" }}
      >
        {answered}/{total}
      </Text>

      <View style={styles.progressTrack} className="flex-1 rounded-full">
        <View
          style={[styles.progressFill, { width: `${progress * 100}%` }]}
          className="rounded-full"
        />
      </View>

      {timerMinutes > 0 ? (
        <View className="ml-3">
          <TestTimer totalSeconds={timerMinutes * 60} onTimeUp={onTimeUp} />
        </View>
      ) : (
        <View className="ml-3 w-1" />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(18,19,24,0.95)",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.04)",
  },
  progressTrack: {
    height: 4,
    backgroundColor: "rgba(255,255,255,0.06)",
  },
  progressFill: {
    height: 4,
    backgroundColor: "#00bc7d",
  },
});
