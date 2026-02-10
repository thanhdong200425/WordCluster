import { FlipCard } from "@/components/flashcard/FlipCard";
import { Text } from "@/components/ui/text";
import { useSets } from "@/hooks/use-sets";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, useWindowDimensions, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

interface FlashcardScreenProps {
  setId: string;
}

const SWIPE_THRESHOLD = 80;

export function FlashcardScreen({ setId }: FlashcardScreenProps) {
  const { getSet } = useSets();
  const router = useRouter();
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const translateX = useSharedValue(0);

  const cardAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const set = getSet(setId);

  if (!set) {
    return (
      <View className="flex-1 items-center justify-center bg-[#121318]">
        <Text className="text-[#a0a4b8]">Set not found</Text>
      </View>
    );
  }

  const items = set.items;

  if (items.length === 0) {
    return (
      <View className="flex-1 items-center justify-center bg-[#121318]">
        <Text className="text-[#a0a4b8]">No cards in this set</Text>
      </View>
    );
  }

  const cardHeight = screenHeight * 0.65;
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === items.length - 1;

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
      if (event.translationX < -SWIPE_THRESHOLD && !isLast) {
        translateX.value = withTiming(-screenWidth, { duration: 200 }, () => {
          runOnJS(goToNext)();
        });
      } else if (event.translationX > SWIPE_THRESHOLD && !isFirst) {
        translateX.value = withTiming(screenWidth, { duration: 200 }, () => {
          runOnJS(goToPrevious)();
        });
      } else {
        translateX.value = withSpring(0, { damping: 20, stiffness: 200 });
      }
    });

  return (
    <View className="flex-1 bg-[#121318]">
      {/* Header */}
      <View className="flex-row items-center justify-between px-5 pb-4 pt-2">
        <Pressable onPress={() => router.back()} className="w-10">
          <Ionicons name="chevron-back" size={24} color="#e8eaf0" />
        </Pressable>
        <View className="flex-1 items-center">
          <Text className="text-lg font-bold text-[#e8eaf0]">Flashcards</Text>
        </View>
        <Text className="w-10 text-right text-xs text-[#a0a4b8]">
          {currentIndex + 1}/{items.length}
        </Text>
      </View>

      {/* Card area */}
      <View className="flex-1 justify-center">
        <GestureDetector gesture={panGesture}>
          <Animated.View style={cardAnimatedStyle}>
            <FlipCard
              item={items[currentIndex]}
              isFlipped={isFlipped}
              onFlip={() => setIsFlipped((prev) => !prev)}
              height={cardHeight}
            />
          </Animated.View>
        </GestureDetector>
      </View>

      {/* Bottom navigation */}
      <View className="flex-row items-center justify-center gap-8 pb-8 pt-4">
        <Pressable
          onPress={isFirst ? undefined : goToPrevious}
          style={{ opacity: isFirst ? 0.3 : 1 }}
        >
          <Ionicons name="chevron-back" size={28} color="#e8eaf0" />
        </Pressable>

        <Text className="text-sm text-[#a0a4b8]">
          {currentIndex + 1} / {items.length}
        </Text>

        <Pressable
          onPress={isLast ? undefined : goToNext}
          style={{ opacity: isLast ? 0.3 : 1 }}
        >
          <Ionicons name="chevron-forward" size={28} color="#e8eaf0" />
        </Pressable>
      </View>
    </View>
  );
}
