import { cn } from "@/lib/utils";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleProp, StyleSheet, ViewStyle } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

interface RightDeleteActionProps {
  progress: SharedValue<number>;
  drag: SharedValue<number>;
  setId: string | number;
  onDelete: (id: string | number) => void;
  containerStyle?: StyleProp<ViewStyle>;
  buttonClassName?: string;
}

const RightDeleteAction = ({
  progress,
  drag,
  setId,
  onDelete,
  containerStyle,
  buttonClassName,
}: RightDeleteActionProps) => {
  const styleAnimation = useAnimatedStyle(() => {
    const opacity = interpolate(
      progress.value,
      [0, 0.2, 1],
      [0, 1, 1],
      Extrapolation.CLAMP,
    );
    const scale = interpolate(
      progress.value,
      [0, 0.6, 1],
      [0.6, 1, 1],
      Extrapolation.CLAMP,
    );
    return {
      opacity,
      transform: [{ scale }],
    };
  });

  return (
    <Animated.View
      style={[styles.actionContainer, styleAnimation, containerStyle]}
    >
      <Pressable
        onPress={() => onDelete(setId)}
        className={cn(
          "w-full h-full justify-center items-center",
          buttonClassName,
        )}
      >
        <Ionicons name="trash-outline" size={24} color="white" />
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  actionContainer: {
    width: 100,
    backgroundColor: "#f55f45",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    borderRadius: 16,
    marginRight: 16,
  },
  actionText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default RightDeleteAction;
