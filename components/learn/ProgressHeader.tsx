import { Text } from "@/components/ui/text";
import { Ionicons } from "@expo/vector-icons";
import { useEffect } from "react";
import { Pressable, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

interface ProgressHeaderProps {
  current: number;
  total: number;
  streak: number;
  onClose: () => void;
}

export function ProgressHeader({
  current,
  total,
  streak,
  onClose,
}: ProgressHeaderProps) {
  const progressWidth = useSharedValue(0);
  const streakScale = useSharedValue(streak >= 2 ? 1 : 0);

  useEffect(() => {
    progressWidth.value = withTiming((current / total) * 100, {
      duration: 400,
      easing: Easing.out(Easing.cubic),
    });
  }, [current, total, progressWidth]);

  useEffect(() => {
    streakScale.value = withSpring(streak >= 2 ? 1 : 0, {
      damping: 12,
      stiffness: 200,
    });
  }, [streak, streakScale]);

  const progressStyle = useAnimatedStyle(() => ({
    width: `${progressWidth.value}%`,
  }));

  const streakStyle = useAnimatedStyle(() => ({
    transform: [{ scale: streakScale.value }],
    opacity: streakScale.value,
  }));

  return (
    <View className="flex-row items-center gap-3 px-5 pb-4 pt-2">
      <Pressable onPress={onClose} className="w-8">
        <Ionicons name="close" size={22} color="#6b7080" />
      </Pressable>

      {/* Progress bar */}
      <View
        className="h-2 flex-1 overflow-hidden rounded-full"
        style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
      >
        <Animated.View
          className="h-full rounded-full"
          style={[{ backgroundColor: "#5b6cff" }, progressStyle]}
        />
      </View>

      {/* Streak badge */}
      <Animated.View
        className="min-w-[40px] flex-row items-center justify-center rounded-lg px-2 py-1"
        style={[
          {
            backgroundColor:
              streak >= 5
                ? "rgba(255,107,138,0.15)"
                : "rgba(251,146,60,0.12)",
          },
          streakStyle,
        ]}
      >
        <Text className="text-xs">🔥</Text>
        <Text
          className="ml-0.5 text-xs font-bold"
          style={{ color: streak >= 5 ? "#ff6b8a" : "#fb923c" }}
        >
          {streak}
        </Text>
      </Animated.View>
    </View>
  );
}
