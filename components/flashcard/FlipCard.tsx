import { CardBack } from "@/components/flashcard/CardBack";
import { CardFront } from "@/components/flashcard/CardFront";
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

interface FlipCardItem {
  term: string;
  definition: string;
  example?: string;
  type?: string;
}

interface FlipCardProps {
  item: FlipCardItem;
  isFlipped: boolean;
  onFlip: () => void;
  height: number;
}

const FLIP_DURATION = 500;

export function FlipCard({ item, isFlipped, onFlip, height }: FlipCardProps) {
  const flipProgress = useSharedValue(0);

  useEffect(() => {
    flipProgress.value = withTiming(isFlipped ? 180 : 0, {
      duration: FLIP_DURATION,
      easing: Easing.bezier(0.4, 0, 0.2, 1),
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
    <View style={[styles.container, { height }]}>
      {/* Front face — entire face is tappable for flip */}
      <Animated.View style={[styles.face, styles.card, frontAnimatedStyle]}>
        <Pressable onPress={handleFlip} style={StyleSheet.absoluteFill}>
          <CardFront term={item.term} type={item.type} />
        </Pressable>
      </Animated.View>

      {/* Back face — definition area tappable for flip, chips separate */}
      <Animated.View style={[styles.face, styles.card, backAnimatedStyle]}>
        <CardBack
          definition={item.definition}
          type={item.type}
          example={item.example}
          onFlip={handleFlip}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  face: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  card: {
    backgroundColor: "#1a1d2e",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(91,108,255,0.15)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
});
