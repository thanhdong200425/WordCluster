import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

interface ExpandableSectionProps {
  visible: boolean;
  children: ReactNode;
}

export function ExpandableSection({
  visible,
  children,
}: ExpandableSectionProps) {
  const [contentHeight, setContentHeight] = useState(0);
  const animatedHeight = useSharedValue(0);
  const animatedOpacity = useSharedValue(0);

  useEffect(() => {
    animatedHeight.value = withSpring(visible ? contentHeight : 0);
    animatedOpacity.value = withSpring(visible ? 1 : 0);
  }, [visible, contentHeight, animatedHeight, animatedOpacity]);

  const containerStyle = useAnimatedStyle(() => ({
    height: animatedHeight.value,
    opacity: animatedOpacity.value,
    overflow: "hidden" as const,
  }));

  return (
    <Animated.View style={containerStyle}>
      <View
        onLayout={(e) => setContentHeight(e.nativeEvent.layout.height)}
        style={{ position: "absolute", width: "100%" }}
      >
        {children}
      </View>
    </Animated.View>
  );
}
