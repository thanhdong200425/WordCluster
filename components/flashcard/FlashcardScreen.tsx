import { CompletionScreen } from "@/components/flashcard/CompletionScreen";
import { FlashcardFaceLayoutModal } from "@/components/flashcard/FlashcardFaceLayoutModal";
import { FlipCard } from "@/components/flashcard/FlipCard";
import { Text } from "@/components/ui/text";
import { useAppTheme } from "@/constants/appTheme";
import useSetsStorage from "@/stores/setsStorage";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, useWindowDimensions, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { scheduleOnRN } from "react-native-worklets";
import { useShallow } from "zustand/react/shallow";

interface FlashcardScreenProps {
  setId: string;
}

const SWIPE_THRESHOLD = 80;

export function FlashcardScreen({ setId }: FlashcardScreenProps) {
  const theme = useAppTheme();
  const insets = useSafeAreaInsets();
  const storedSets = useSetsStorage(useShallow((state) => state.storedSets));
  const router = useRouter();
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [layoutModalOpen, setLayoutModalOpen] = useState(false);
  const translateX = useSharedValue(0);

  const cardAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const set = storedSets.find((set) => set.id === setId);

  if (!set) {
    return (
      <View
        className="flex-1 items-center justify-center"
        style={{ backgroundColor: theme.bg }}
      >
        <Text style={{ color: theme.textMuted }}>Set not found</Text>
      </View>
    );
  }

  const items = set.items;

  if (items.length === 0) {
    return (
      <View
        className="flex-1 items-center justify-center"
        style={{ backgroundColor: theme.bg }}
      >
        <Text style={{ color: theme.textMuted }}>No cards in this set</Text>
      </View>
    );
  }

  const cardHeight = screenHeight * 0.65;
  const isFirst = currentIndex === 0;

  const goToNext = () => {
    if (currentIndex === items.length - 1) {
      setIsCompleted(true);
      return;
    }
    setCurrentIndex((prev) => prev + 1);
    setIsFlipped(false);
    translateX.value = 0;
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setIsCompleted(false);
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
      if (event.translationX < -SWIPE_THRESHOLD) {
        translateX.value = withTiming(-screenWidth, { duration: 200 }, () => {
          scheduleOnRN(goToNext);
        });
      } else if (event.translationX > SWIPE_THRESHOLD && !isFirst) {
        translateX.value = withTiming(screenWidth, { duration: 200 }, () => {
          scheduleOnRN(goToPrevious);
        });
      } else {
        translateX.value = withSpring(0, { damping: 20, stiffness: 200 });
      }
    });

  if (isCompleted) {
    return (
      <CompletionScreen
        totalCards={items.length}
        onRestart={handleRestart}
        onBack={() => router.back()}
      />
    );
  }

  const headerIconButtonStyle = [
    styles.headerIconButton,
    {
      backgroundColor: theme.surface,
      borderColor: theme.border2,
    },
  ];

  const navCircleStyle = [
    styles.navCircleButton,
    { backgroundColor: theme.surface2 },
  ];

  return (
    <View className="flex-1" style={{ backgroundColor: theme.bg }}>
      <View
        className="flex-row items-center border-b px-5 pb-3"
        style={{
          borderBottomColor: theme.border,
          paddingTop: insets.top * 0.2,
        }}
      >
        <Pressable
          onPress={() => router.back()}
          style={({ pressed }) => [
            ...headerIconButtonStyle,
            { opacity: pressed ? 0.85 : 1 },
          ]}
        >
          <Ionicons name="chevron-back" size={18} color={theme.text} />
        </Pressable>
        <View className="min-w-0 flex-1 items-center px-2">
          <Text
            className="text-[17px] font-bold"
            style={{ color: theme.text }}
            numberOfLines={1}
          >
            Flashcards
          </Text>
        </View>
        <Pressable
          onPress={() => setLayoutModalOpen(true)}
          style={({ pressed }) => [
            ...headerIconButtonStyle,
            { opacity: pressed ? 0.7 : 1 },
          ]}
          accessibilityLabel="Flashcard layout settings"
        >
          <Ionicons name="options-outline" size={18} color={theme.textMuted} />
        </Pressable>
      </View>

      <FlashcardFaceLayoutModal
        visible={layoutModalOpen}
        onClose={() => setLayoutModalOpen(false)}
      />

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

      <View
        className="border-t px-[22px] pt-3"
        style={{
          borderTopColor: theme.border,
          backgroundColor: theme.surface,
          paddingBottom: Math.max(insets.bottom, 20),
        }}
      >
        <View className="flex-row items-center justify-center gap-10">
          <Pressable
            onPress={isFirst ? undefined : goToPrevious}
            disabled={isFirst}
            style={({ pressed }) => [
              ...navCircleStyle,
              {
                opacity: isFirst ? 0.3 : pressed ? 0.9 : 1,
              },
            ]}
          >
            <Ionicons name="chevron-back" size={22} color={theme.textMuted} />
          </Pressable>

          <Text
            className="min-w-[48px] text-center text-base"
            style={{ color: theme.textMuted }}
          >
            {currentIndex + 1} / {items.length}
          </Text>

          <Pressable
            onPress={goToNext}
            style={({ pressed }) => [
              ...navCircleStyle,
              { opacity: pressed ? 0.9 : 1 },
            ]}
          >
            <Ionicons name="chevron-forward" size={22} color={theme.text} />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerIconButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: StyleSheet.hairlineWidth,
  },
  navCircleButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
});
