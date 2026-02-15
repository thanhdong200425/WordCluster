import { Text } from "@/components/ui/text";
import { useEffect } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

interface FeedbackOverlayProps {
  correct: boolean | null;
}

export function FeedbackOverlay({ correct }: FeedbackOverlayProps) {
  const translateY = useSharedValue(80);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (correct !== null) {
      translateY.value = withTiming(0, { duration: 150 });
      opacity.value = withTiming(1, { duration: 150 });
    } else {
      translateY.value = withTiming(80, { duration: 150 });
      opacity.value = withTiming(0, { duration: 150 });
    }
  }, [correct, translateY, opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));

  if (correct === null) return null;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: correct
            ? "rgba(0,188,125,0.12)"
            : "rgba(255,107,138,0.12)",
          borderTopColor: correct
            ? "rgba(0,188,125,0.3)"
            : "rgba(255,107,138,0.3)",
        },
        animatedStyle,
      ]}
    >
      <Text style={{ fontSize: 22 }}>{correct ? "🎉" : "😔"}</Text>
      <Text
        className="ml-2 text-[15px] font-bold"
        style={{ color: correct ? "#00bc7d" : "#ff6b8a" }}
      >
        {correct ? "Correct!" : "Not quite"}
      </Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderTopWidth: 2,
  },
});
