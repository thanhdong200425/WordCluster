import { CardFace, CardFaceItem } from "@/components/flashcard/CardFace";
import { useAppTheme } from "@/constants/appTheme";
import useFlashcardLayoutStore from "@/stores/flashcardLayoutStore";
import * as Haptics from "expo-haptics";
import { useEffect, useMemo } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export type { CardFaceItem as FlipCardItem };

interface FlipCardProps {
  item: CardFaceItem;
  isFlipped: boolean;
  onFlip: () => void;
  height: number;
}

const FLIP_DURATION = 500;

export function FlipCard({ item, isFlipped, onFlip, height }: FlipCardProps) {
  const theme = useAppTheme();
  const frontFields = useFlashcardLayoutStore((s) => s.frontFields);
  const backFields = useFlashcardLayoutStore((s) => s.backFields);
  const flipProgress = useSharedValue(0);

  const cardSurfaceStyle = useMemo(
    () => ({
      backgroundColor: theme.surface,
      borderRadius: 24,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: theme.border2,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.07,
      shadowRadius: 12,
      elevation: 4,
    }),
    [theme.surface, theme.border2],
  );

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
      {/* Front face — entire face tappable via parent Pressable */}
      <Animated.View style={[styles.face, cardSurfaceStyle, frontAnimatedStyle]}>
        <Pressable onPress={handleFlip} style={StyleSheet.absoluteFill}>
          <CardFace
            item={item}
            enabledFields={frontFields}
            isFront
            onFlip={handleFlip}
          />
        </Pressable>
      </Animated.View>

      {/* Back face — content area tappable for flip inside CardFace */}
      <Animated.View style={[styles.face, cardSurfaceStyle, backAnimatedStyle]}>
        <CardFace
          item={item}
          enabledFields={backFields}
          isFront={false}
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
});
