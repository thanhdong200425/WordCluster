import { Text } from "@/components/ui/text";
import { useEffect } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

interface CorrectAnswerBoxProps {
  term: string;
}

export function CorrectAnswerBox({ term }: CorrectAnswerBoxProps) {
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 300 });
  }, [opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      className="mt-3 rounded-xl px-4 py-3"
      style={[
        {
          backgroundColor: "rgba(91,108,255,0.08)",
          borderWidth: 1,
          borderColor: "rgba(91,108,255,0.15)",
        },
        animatedStyle,
      ]}
    >
      <Text
        className="mb-1 font-bold uppercase text-[#5b6cff]"
        style={{ fontSize: 11, letterSpacing: 0.8 }}
      >
        CORRECT ANSWER
      </Text>
      <Text className="text-base font-bold text-[#e8eaf0]">{term}</Text>
    </Animated.View>
  );
}
