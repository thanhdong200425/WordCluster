import { useEffect, useMemo } from "react";
import { StyleSheet, useWindowDimensions } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";

const PARTICLE_COUNT = 60;
const COLORS = ["#5b6cff", "#ad46ff", "#00bc7d", "#fb923c", "#ff6b8a", "#ffd700"];

interface ParticleConfig {
  x: number;
  startY: number;
  size: number;
  color: string;
  isCircle: boolean;
  duration: number;
  delay: number;
  rotationEnd: number;
  drift: number;
}

function Particle({ config, screenHeight }: { config: ParticleConfig; screenHeight: number }) {
  const translateY = useSharedValue(config.startY);
  const opacity = useSharedValue(1);
  const rotation = useSharedValue(0);
  const translateX = useSharedValue(config.x);

  useEffect(() => {
    translateY.value = withDelay(
      config.delay,
      withTiming(screenHeight + 20, {
        duration: config.duration,
        easing: Easing.linear,
      })
    );
    translateX.value = withDelay(
      config.delay,
      withTiming(config.x + config.drift, {
        duration: config.duration,
        easing: Easing.linear,
      })
    );
    opacity.value = withDelay(
      config.delay + config.duration * 0.7,
      withTiming(0, { duration: config.duration * 0.3 })
    );
    rotation.value = withDelay(
      config.delay,
      withTiming(config.rotationEnd, {
        duration: config.duration,
        easing: Easing.linear,
      })
    );
  }, [translateY, translateX, opacity, rotation, config, screenHeight]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { rotate: `${rotation.value}deg` },
    ],
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[
        {
          position: "absolute",
          width: config.size,
          height: config.isCircle ? config.size : config.size * 0.6,
          backgroundColor: config.color,
          borderRadius: config.isCircle ? config.size / 2 : 2,
        },
        animatedStyle,
      ]}
    />
  );
}

export function ConfettiAnimation() {
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();

  const particles = useMemo<ParticleConfig[]>(() => {
    return Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * screenWidth,
      startY: -(Math.random() * 60 + 20),
      size: Math.random() * 6 + 6,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      isCircle: Math.random() > 0.5,
      duration: Math.random() * 1500 + 2500,
      delay: Math.random() * 500,
      rotationEnd: Math.random() * 720 - 360,
      drift: Math.random() * 80 - 40,
    }));
  }, [screenWidth]);

  return (
    <Animated.View style={styles.container} pointerEvents="none">
      {particles.map((config, i) => (
        <Particle key={i} config={config} screenHeight={screenHeight} />
      ))}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 10,
  },
});
