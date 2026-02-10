import { Text } from "@/components/ui/text";
import { useState } from "react";
import { View } from "react-native";
import Animated, {
  type SharedValue,
  useAnimatedProps,
  useDerivedValue,
} from "react-native-reanimated";
import Svg, { Circle, Defs, LinearGradient, Stop } from "react-native-svg";
import { scheduleOnRN } from "react-native-worklets";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface CircularProgressProps {
  size?: number;
  strokeWidth?: number;
  progress: SharedValue<number>;
}

export function CircularProgress({
  size = 140,
  strokeWidth = 10,
  progress,
}: CircularProgressProps) {
  const [displayPercent, setDisplayPercent] = useState(0);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const center = size / 2;

  const updateDisplay = (val: number) => {
    setDisplayPercent(Math.round(val));
  };

  useDerivedValue(() => {
    scheduleOnRN(updateDisplay, progress.value);
  });

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: circumference * (1 - progress.value / 100),
  }));

  return (
    <View
      style={{
        width: size,
        height: size,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Svg width={size} height={size}>
        <Defs>
          <LinearGradient id="progressGradient" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0" stopColor="#5b6cff" />
            <Stop offset="1" stopColor="#ad46ff" />
          </LinearGradient>
        </Defs>

        {/* Background track */}
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={strokeWidth}
          fill="none"
        />

        {/* Progress arc */}
        <AnimatedCircle
          cx={center}
          cy={center}
          r={radius}
          stroke="url(#progressGradient)"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          animatedProps={animatedProps}
          strokeLinecap="round"
          transform={`rotate(-90 ${center} ${center})`}
        />
      </Svg>

      {/* Center percentage */}
      <View
        style={{
          position: "absolute",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          className="font-extrabold text-[#e8eaf0]"
          style={{ fontSize: 28 }}
        >
          {displayPercent}%
        </Text>
      </View>
    </View>
  );
}
