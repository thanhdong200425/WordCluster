import { CircularProgress } from "@/components/flashcard/CircularProgress";
import { ConfettiAnimation } from "@/components/flashcard/ConfettiAnimation";
import { Text } from "@/components/ui/text";
import { Ionicons } from "@expo/vector-icons";
import { useEffect } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSpring,
  withTiming,
} from "react-native-reanimated";

interface CompletionScreenProps {
  totalCards: number;
  onRestart: () => void;
  onBack: () => void;
}

export function CompletionScreen({ totalCards, onRestart, onBack }: CompletionScreenProps) {
  const ringScale = useSharedValue(0);
  const progress = useSharedValue(0);
  const titleOpacity = useSharedValue(0);
  const titleTranslateY = useSharedValue(10);
  const statsOpacity = useSharedValue(0);
  const statsTranslateY = useSharedValue(10);
  const buttonsOpacity = useSharedValue(0);
  const buttonsTranslateY = useSharedValue(10);
  const glowOpacity = useSharedValue(0.4);

  useEffect(() => {
    // Staggered entrance sequence
    ringScale.value = withDelay(300, withSpring(1, { damping: 12, stiffness: 100 }));
    progress.value = withDelay(
      300,
      withTiming(100, { duration: 1000, easing: Easing.out(Easing.cubic) })
    );

    titleOpacity.value = withDelay(450, withTiming(1, { duration: 400 }));
    titleTranslateY.value = withDelay(450, withTiming(0, { duration: 400 }));

    statsOpacity.value = withDelay(800, withTiming(1, { duration: 400 }));
    statsTranslateY.value = withDelay(800, withTiming(0, { duration: 400 }));

    buttonsOpacity.value = withDelay(1000, withTiming(1, { duration: 400 }));
    buttonsTranslateY.value = withDelay(1000, withTiming(0, { duration: 400 }));

    // Pulsing glow
    glowOpacity.value = withDelay(
      300,
      withRepeat(withTiming(0.7, { duration: 1500 }), -1, true)
    );
  }, [
    ringScale, progress, titleOpacity, titleTranslateY,
    statsOpacity, statsTranslateY, buttonsOpacity, buttonsTranslateY, glowOpacity,
  ]);

  const ringContainerStyle = useAnimatedStyle(() => ({
    transform: [{ scale: ringScale.value }],
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
  }));

  const titleStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
    transform: [{ translateY: titleTranslateY.value }],
  }));

  const statsStyle = useAnimatedStyle(() => ({
    opacity: statsOpacity.value,
    transform: [{ translateY: statsTranslateY.value }],
  }));

  const buttonsStyle = useAnimatedStyle(() => ({
    opacity: buttonsOpacity.value,
    transform: [{ translateY: buttonsTranslateY.value }],
  }));

  return (
    <View className="flex-1 bg-[#121318]">
      <ConfettiAnimation />

      <View className="flex-1 items-center justify-center px-8">
        {/* Ring with glow */}
        <Animated.View style={ringContainerStyle} className="mb-8">
          <View className="items-center justify-center">
            <Animated.View style={[styles.glow, glowStyle]} />
            <CircularProgress progress={progress} />
          </View>
        </Animated.View>

        {/* Title */}
        <Animated.View style={titleStyle} className="mb-2 items-center">
          <Text
            className="font-extrabold text-[#e8eaf0]"
            style={{ fontSize: 26 }}
          >
            Session Complete!
          </Text>
          <Text className="mt-2 text-[15px] text-[#6b7080]">
            You reviewed all {totalCards} cards
          </Text>
        </Animated.View>

        {/* Stats card */}
        <Animated.View
          style={[statsStyle, styles.statsCard]}
          className="mt-6 w-full flex-row items-center rounded-2xl px-5 py-4"
        >
          <Text style={{ fontSize: 28 }} className="mr-4">
            📚
          </Text>
          <View className="flex-1">
            <Text
              className="font-extrabold text-[#5b6cff]"
              style={{ fontSize: 30 }}
            >
              {totalCards}
            </Text>
            <Text
              className="font-bold text-[#6b7080]"
              style={{ fontSize: 11, letterSpacing: 1, textTransform: "uppercase" }}
            >
              Cards Completed
            </Text>
          </View>
        </Animated.View>

        {/* Buttons */}
        <Animated.View style={buttonsStyle} className="mt-8 w-full gap-3">
          <Pressable
            onPress={onRestart}
            style={styles.primaryButton}
            className="flex-row items-center justify-center rounded-xl py-4"
          >
            <Ionicons name="refresh" size={18} color="#fff" />
            <Text className="ml-2 text-base font-bold text-white">
              Study Again
            </Text>
          </Pressable>

          <Pressable
            onPress={onBack}
            style={styles.secondaryButton}
            className="flex-row items-center justify-center rounded-xl py-4"
          >
            <Ionicons name="chevron-back" size={18} color="#a0a4b8" />
            <Text className="ml-1 text-base font-semibold text-[#a0a4b8]">
              Back to Set
            </Text>
          </Pressable>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  glow: {
    position: "absolute",
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: "rgba(91,108,255,0.15)",
  },
  statsCard: {
    backgroundColor: "rgba(255,255,255,0.03)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },
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
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
});
