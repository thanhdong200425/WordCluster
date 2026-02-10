import { Text } from "@/components/ui/text";
import * as Haptics from "expo-haptics";
import { useEffect } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

interface FlashCardProps {
  term: string;
  definition: string;
  isFlipped: boolean;
  onFlip: () => void;
}

const FLIP_DURATION = 400;

export function FlashCard({ term, definition, isFlipped, onFlip }: FlashCardProps) {
  const flipProgress = useSharedValue(0);

  useEffect(() => {
    flipProgress.value = withTiming(isFlipped ? 180 : 0, {
      duration: FLIP_DURATION,
      easing: Easing.inOut(Easing.ease),
    });
  }, [isFlipped, flipProgress]);

  const frontAnimatedStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(flipProgress.value, [0, 180], [0, 180]);
    return {
      transform: [{ perspective: 1200 }, { rotateY: `${rotateY}deg` }],
      backfaceVisibility: "hidden" as const,
      opacity: flipProgress.value < 90 ? 1 : 0,
    };
  });

  const backAnimatedStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(flipProgress.value, [0, 180], [180, 360]);
    return {
      transform: [{ perspective: 1200 }, { rotateY: `${rotateY}deg` }],
      backfaceVisibility: "hidden" as const,
      opacity: flipProgress.value >= 90 ? 1 : 0,
    };
  });

  const handleFlip = () => {
    if (process.env.EXPO_OS === "ios") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    onFlip();
  };

  return (
    <Pressable onPress={handleFlip} style={styles.container}>
      <Animated.View
        style={[styles.face, frontAnimatedStyle]}
        className="rounded-2xl bg-[#282b37] px-6 py-8"
      >
        <Text className="mb-4 text-center text-[10px] font-extrabold uppercase tracking-widest text-gray-400">
          TERM
        </Text>
        <View className="flex-1 items-center justify-center">
          <Text className="text-center text-base leading-6 text-white">
            {term}
          </Text>
        </View>
      </Animated.View>

      <Animated.View
        style={[styles.face, styles.backFace, backAnimatedStyle]}
        className="rounded-2xl bg-[#282b37] px-6 py-8"
      >
        <Text className="mb-4 text-center text-[10px] font-extrabold uppercase tracking-widest text-gray-400">
          DEFINITION
        </Text>
        <View className="flex-1 items-center justify-center">
          <Text className="text-center text-base leading-6 text-white">
            {definition}
          </Text>
        </View>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 240,
    marginHorizontal: 20,
  },
  face: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
  },
  backFace: {
    zIndex: 1,
  },
});
