import { useAppTheme } from "@/constants/appTheme";
import { SvgXml } from "react-native-svg";
import { Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { useEffect } from "react";

const EMPTY_SVG = `<svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M26.2083 8.5H7.79167C5.83566 8.5 4.25 10.0857 4.25 12.0417V23.375C4.25 25.331 5.83566 26.9167 7.79167 26.9167H26.2083C28.1643 26.9167 29.75 25.331 29.75 23.375V12.0417C29.75 10.0857 28.1643 8.5 26.2083 8.5Z" fill="#5B6BF8" fill-opacity="0.1" stroke="#5B6BF8" stroke-width="2.26667"/>
<path d="M8.5 8.5V7.08333C8.5 6.33189 8.79851 5.61122 9.32986 5.07986C9.86122 4.54851 10.5819 4.25 11.3333 4.25H22.6667C23.4181 4.25 24.1388 4.54851 24.6701 5.07986C25.2015 5.61122 25.5 6.33189 25.5 7.08333V8.5" stroke="#5B6BF8" stroke-width="2.26667" stroke-linecap="round"/>
<path d="M12.75 18.4165H21.25M12.75 22.6665H18.4167" stroke="#5B6BF8" stroke-width="2.26667" stroke-linecap="round"/>
</svg>`;

interface EmptyStateProps {
  title?: string;
  description?: string;
  hint?: string;
}

export function EmptyState({
  title = "Let's build your first set!",
  description = "Great learners start somewhere. Create a flashcard set and turn anything you want to know into something you'll never forget.",
  hint = "Tap the + button to get started",
}: EmptyStateProps) {
  const theme = useAppTheme();
  const rotation = useSharedValue(0);
  const scale = useSharedValue(1);

  useEffect(() => {
    rotation.value = withRepeat(
      withSequence(
        withTiming(15, { duration: 1800, easing: Easing.inOut(Easing.sin) }),
        withTiming(-15, { duration: 1800, easing: Easing.inOut(Easing.sin) }),
      ),
      -1,
      true,
    );
    scale.value = withRepeat(
      withSequence(
        withTiming(1.08, { duration: 2200, easing: Easing.inOut(Easing.sin) }),
        withTiming(1, { duration: 2200, easing: Easing.inOut(Easing.sin) }),
      ),
      -1,
      true,
    );
  }, []);

  const animatedIconStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }, { scale: scale.value }],
  }));

  return (
    <View className="flex-1 items-center justify-center px-8">
      {/* Icon container */}
      <View
        className="mb-8 h-24 w-24 items-center justify-center rounded-full"
        style={{ backgroundColor: theme.surface }}
      >
        <Animated.View style={animatedIconStyle}>
          <SvgXml xml={EMPTY_SVG} width={40} height={40} />
        </Animated.View>
      </View>

      {/* Title */}
      <Text
        className="mb-3 text-center text-[22px] font-bold"
        style={{ color: theme.text }}
      >
        {title}
      </Text>

      {/* Description */}
      <Text
        className="mb-8 text-center text-[15px] leading-6"
        style={{ color: theme.textMuted }}
      >
        {description}
      </Text>

      {/* Hint pill */}
      <View
        className="flex-row items-center gap-2 rounded-full px-5 py-3"
        style={{
          backgroundColor: theme.surface,
          borderWidth: 1,
          borderColor: theme.border2,
        }}
      >
        <View
          className="h-6 w-6 items-center justify-center rounded-full"
          style={{ backgroundColor: theme.accentStart }}
        >
          <Text className="text-[13px] font-bold text-white">+</Text>
        </View>
        <Text
          className="text-[14px] font-medium"
          style={{ color: theme.textMuted }}
        >
          {hint}
        </Text>
      </View>
    </View>
  );
}
