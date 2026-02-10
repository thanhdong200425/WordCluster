import { CardCounter } from "@/components/set-detail/CardCounter";
import { FlashCard } from "@/components/set-detail/FlashCard";
import { Text } from "@/components/ui/text";
import { useState } from "react";
import { useWindowDimensions, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

interface SetItem {
  term: string;
  definition: string;
  example?: string;
  type?: string;
}

interface FlashCardDeckProps {
  items: SetItem[];
}

const SWIPE_THRESHOLD = 80;

export function FlashCardDeck({ items }: FlashCardDeckProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const translateX = useSharedValue(0);
  const { width: screenWidth } = useWindowDimensions();

  const cardAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  if (items.length === 0) {
    return (
      <View className="mx-5 items-center rounded-2xl bg-[#282b37] px-6 py-8">
        <Text className="text-[#a0a4b8]">No cards in this set</Text>
      </View>
    );
  }

  const goToNext = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, items.length - 1));
    setIsFlipped(false);
    translateX.value = 0;
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
    setIsFlipped(false);
    translateX.value = 0;
  };

  const panGesture = Gesture.Pan()
    .activeOffsetX([-20, 20])
    .failOffsetY([-10, 10])
    .onUpdate((event) => {
      translateX.value = event.translationX;
    })
    .onEnd((event) => {
      if (
        event.translationX < -SWIPE_THRESHOLD &&
        currentIndex < items.length - 1
      ) {
        translateX.value = withTiming(-screenWidth, { duration: 200 }, () => {
          runOnJS(goToNext)();
        });
      } else if (
        event.translationX > SWIPE_THRESHOLD &&
        currentIndex > 0
      ) {
        translateX.value = withTiming(screenWidth, { duration: 200 }, () => {
          runOnJS(goToPrevious)();
        });
      } else {
        translateX.value = withSpring(0, { damping: 20, stiffness: 200 });
      }
    });

  return (
    <View>
      <GestureDetector gesture={panGesture}>
        <Animated.View style={cardAnimatedStyle}>
          <FlashCard
            term={items[currentIndex].term}
            definition={items[currentIndex].definition}
            isFlipped={isFlipped}
            onFlip={() => setIsFlipped((prev) => !prev)}
          />
        </Animated.View>
      </GestureDetector>
      <CardCounter current={currentIndex + 1} total={items.length} />
    </View>
  );
}
