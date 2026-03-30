import { TestTimer } from "@/components/test/TestTimer";
import { Text } from "@/components/ui/text";
import { useAppTheme } from "@/constants/appTheme";
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
  const theme = useAppTheme();
  const progress = total > 0 ? answered / total : 0;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.bg,
          borderBottomColor: theme.border,
        },
      ]}
      className="flex-row items-center px-4 py-3"
    >
      <Pressable onPress={onCancel} className="mr-3">
        <Ionicons name="close" size={22} color={theme.textMuted} />
      </Pressable>

      <Text
        className="mr-3 font-bold"
        style={{ fontSize: 11, color: theme.textMuted }}
      >
        {answered}/{total}
      </Text>

      <View
        style={[styles.progressTrack, { backgroundColor: theme.border }]}
        className="flex-1 rounded-full"
      >
        <View
          style={[
            styles.progressFill,
            { backgroundColor: theme.accentStart, width: `${progress * 100}%` },
          ]}
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
    borderBottomWidth: 1,
  },
  progressTrack: {
    height: 4,
  },
  progressFill: {
    height: 4,
  },
});
