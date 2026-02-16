import { Text } from "@/components/ui/text";
import useStreakStorage from "@/stores/streakStorage";
import { Ionicons } from "@expo/vector-icons";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const DAY_LABELS = ["M", "T", "W", "T", "F", "S", "S"];

function WeekDot({ active, index }: { active: boolean; index: number }) {
  const scale = useSharedValue(0);

  useEffect(() => {
    scale.value = withDelay(index * 60, withSpring(1, { damping: 12 }));
  }, [scale, index]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <View className="items-center gap-1">
      <Text className="text-[10px] text-[#6b7080]">{DAY_LABELS[index]}</Text>
      <Animated.View
        style={animatedStyle}
        className={`h-5 w-5 items-center justify-center rounded-full ${
          active ? "bg-[#5b6cff]" : "bg-[#2c2e3a]"
        }`}
      >
        {active && (
          <Ionicons name="checkmark" size={12} color="#fff" />
        )}
      </Animated.View>
    </View>
  );
}

export function StreakCard() {
  const { getCurrentStreak, getBestStreak, getWeekActivity } =
    useStreakStorage();

  const streak = getCurrentStreak();
  const bestStreak = getBestStreak();
  const weekActivity = getWeekActivity();

  const cardOpacity = useSharedValue(0);
  const cardTranslateY = useSharedValue(12);

  useEffect(() => {
    cardOpacity.value = withTiming(1, { duration: 400 });
    cardTranslateY.value = withSpring(0, { damping: 14 });
  }, [cardOpacity, cardTranslateY]);

  const cardStyle = useAnimatedStyle(() => ({
    opacity: cardOpacity.value,
    transform: [{ translateY: cardTranslateY.value }],
  }));

  const hasStreak = streak > 0;

  return (
    <Animated.View
      style={[styles.card, hasStreak && styles.cardActive, cardStyle]}
      className="mx-5 mb-3 rounded-2xl p-4"
    >
      <View className="flex-row items-center justify-between">
        {/* Left: streak info */}
        <View className="flex-row items-center gap-3">
          <View
            style={[styles.iconCircle, hasStreak && styles.iconCircleActive]}
            className="h-12 w-12 items-center justify-center rounded-full"
          >
            <Ionicons
              name="flame"
              size={24}
              color={hasStreak ? "#ff8c42" : "#6b7080"}
            />
          </View>
          <View>
            <Text className="text-2xl font-extrabold text-white">
              {streak}
            </Text>
            <Text className="text-xs text-[#a0a4b8]">
              {streak === 1 ? "day streak" : "day streak"}
            </Text>
          </View>
        </View>

        {/* Right: week dots */}
        <View className="flex-row gap-2">
          {weekActivity.map((active, i) => (
            <WeekDot key={i} active={active} index={i} />
          ))}
        </View>
      </View>

      {/* Bottom: best streak */}
      {bestStreak > 0 && (
        <View className="mt-3 flex-row items-center gap-1.5 border-t border-[#2c2e3a] pt-3">
          <Ionicons name="trophy-outline" size={14} color="#a0a4b8" />
          <Text className="text-xs text-[#a0a4b8]">
            Best streak: {bestStreak} {bestStreak === 1 ? "day" : "days"}
          </Text>
        </View>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1c1e26",
  },
  cardActive: {
    borderWidth: 1,
    borderColor: "rgba(255, 140, 66, 0.15)",
  },
  iconCircle: {
    backgroundColor: "rgba(107, 112, 128, 0.15)",
  },
  iconCircleActive: {
    backgroundColor: "rgba(255, 140, 66, 0.15)",
  },
});
