import { Text } from "@/components/ui/text";
import { Ionicons } from "@expo/vector-icons";
import { useCallback, useEffect, useRef, useState } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

interface TestTimerProps {
  totalSeconds: number;
  onTimeUp: () => void;
}

export function TestTimer({ totalSeconds, onTimeUp }: TestTimerProps) {
  const [remaining, setRemaining] = useState(totalSeconds);
  const onTimeUpRef = useRef(onTimeUp);
  onTimeUpRef.current = onTimeUp;

  const pulseOpacity = useSharedValue(1);
  const isLow = remaining <= 60;

  useEffect(() => {
    if (isLow) {
      pulseOpacity.value = withRepeat(
        withTiming(0.6, { duration: 500 }),
        -1,
        true,
      );
    }
  }, [isLow, pulseOpacity]);

  const tick = useCallback(() => {
    setRemaining((prev) => {
      if (prev <= 1) {
        onTimeUpRef.current();
        return 0;
      }
      return prev - 1;
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [tick]);

  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;
  const formatted = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  const pulseStyle = useAnimatedStyle(() => ({
    opacity: isLow ? pulseOpacity.value : 1,
  }));

  return (
    <Animated.View
      style={[styles.container, isLow ? styles.containerLow : styles.containerNormal, pulseStyle]}
      className="flex-row items-center rounded-lg px-3 py-1"
    >
      <Ionicons
        name="timer-outline"
        size={14}
        color={isLow ? "#ff6b8a" : "#e8eaf0"}
      />
      <Text
        className="ml-1 font-bold"
        style={{
          fontSize: 13,
          fontFamily: "monospace",
          fontVariant: ["tabular-nums"],
          color: isLow ? "#ff6b8a" : "#e8eaf0",
        }}
      >
        {formatted}
      </Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
  },
  containerNormal: {
    backgroundColor: "rgba(255,255,255,0.04)",
    borderColor: "rgba(255,255,255,0.06)",
  },
  containerLow: {
    backgroundColor: "rgba(255,107,138,0.12)",
    borderColor: "rgba(255,107,138,0.2)",
  },
});
