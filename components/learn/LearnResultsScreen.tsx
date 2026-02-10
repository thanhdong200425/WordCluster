import { Text } from "@/components/ui/text";
import { Ionicons } from "@expo/vector-icons";
import { useEffect } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";

interface LearnResultsScreenProps {
  results: boolean[];
  totalQuestions: number;
  onRestart: () => void;
  onBack: () => void;
}

function getResultMeta(percentage: number) {
  if (percentage === 100) return { emoji: "🏆", message: "Perfect Score!" };
  if (percentage >= 80) return { emoji: "🌟", message: "Great Job!" };
  if (percentage >= 60) return { emoji: "👍", message: "Good Progress!" };
  return { emoji: "📚", message: "Keep Practicing!" };
}

export function LearnResultsScreen({
  results,
  totalQuestions,
  onRestart,
  onBack,
}: LearnResultsScreenProps) {
  const correctCount = results.filter(Boolean).length;
  const percentage = Math.round((correctCount / totalQuestions) * 100);
  const meta = getResultMeta(percentage);

  const emojiScale = useSharedValue(0);
  const messageOpacity = useSharedValue(0);
  const messageTranslateY = useSharedValue(10);
  const percentOpacity = useSharedValue(0);
  const percentTranslateY = useSharedValue(10);
  const dotsOpacity = useSharedValue(0);
  const dotsTranslateY = useSharedValue(10);
  const buttonsOpacity = useSharedValue(0);
  const buttonsTranslateY = useSharedValue(10);

  useEffect(() => {
    emojiScale.value = withDelay(
      200,
      withSpring(1, { damping: 10, stiffness: 150 }),
    );
    messageOpacity.value = withDelay(400, withTiming(1, { duration: 400 }));
    messageTranslateY.value = withDelay(400, withTiming(0, { duration: 400 }));
    percentOpacity.value = withDelay(600, withTiming(1, { duration: 400 }));
    percentTranslateY.value = withDelay(600, withTiming(0, { duration: 400 }));
    dotsOpacity.value = withDelay(800, withTiming(1, { duration: 400 }));
    dotsTranslateY.value = withDelay(800, withTiming(0, { duration: 400 }));
    buttonsOpacity.value = withDelay(1000, withTiming(1, { duration: 400 }));
    buttonsTranslateY.value = withDelay(1000, withTiming(0, { duration: 400 }));
  }, [
    emojiScale,
    messageOpacity,
    messageTranslateY,
    percentOpacity,
    percentTranslateY,
    dotsOpacity,
    dotsTranslateY,
    buttonsOpacity,
    buttonsTranslateY,
  ]);

  const emojiStyle = useAnimatedStyle(() => ({
    transform: [{ scale: emojiScale.value }],
  }));

  const messageStyle = useAnimatedStyle(() => ({
    opacity: messageOpacity.value,
    transform: [{ translateY: messageTranslateY.value }],
  }));

  const percentStyle = useAnimatedStyle(() => ({
    opacity: percentOpacity.value,
    transform: [{ translateY: percentTranslateY.value }],
  }));

  const buttonsStyle = useAnimatedStyle(() => ({
    opacity: buttonsOpacity.value,
    transform: [{ translateY: buttonsTranslateY.value }],
  }));

  return (
    <View className="flex-1 bg-[#121318] px-4 justify-center items-center gap-4">
      {/* Emoji */}
      <Animated.View style={[emojiStyle]}>
        <Text className="text-[64px] leading-normal">{meta.emoji}</Text>
      </Animated.View>

      {/* Message */}
      <Animated.View style={messageStyle} className="items-center">
        <Text className="font-extrabold text-[#e8eaf0] text-[24px] leading-normal">
          {meta.message}
        </Text>
      </Animated.View>

      {/* Percentage */}
      <Animated.View style={percentStyle} className="items-center">
        <Text className="font-extrabold text-[#5b6cff] text-[42px] leading-normal">
          {percentage}%
        </Text>
        <Text className="text-[14px] text-[#6b7080] leading-normal">
          {correctCount} of {totalQuestions} correct
        </Text>
      </Animated.View>

      {/* Buttons */}
      <Animated.View style={buttonsStyle} className="mt-1 w-full gap-3">
        <Pressable
          onPress={onRestart}
          style={styles.primaryButton}
          className="flex-row items-center justify-center rounded-xl py-4"
        >
          <Ionicons name="refresh" size={18} color="#fff" />
          <Text className="ml-2 text-[15px] font-bold text-white">
            Study Again
          </Text>
        </Pressable>

        <Pressable
          onPress={onBack}
          style={styles.secondaryButton}
          className="flex-row items-center justify-center rounded-xl py-4"
        >
          <Ionicons name="chevron-back" size={18} color="#a0a4b8" />
          <Text className="ml-1 text-[15px] font-semibold text-[#a0a4b8]">
            Back to Set
          </Text>
        </Pressable>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  primaryButton: {
    backgroundColor: "#5b6cff",
    shadowColor: "rgba(91,108,255,0.3)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 4,
  },
  secondaryButton: {
    backgroundColor: "transparent",
    borderWidth: 1.5,
    borderColor: "rgba(255,255,255,0.1)",
  },
});
