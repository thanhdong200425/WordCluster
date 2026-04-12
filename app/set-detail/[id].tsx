import { ProUpsellSheet } from "@/components/paywall/ProUpsellSheet";
import { FlashCardDeck } from "@/components/set-detail/FlashCardDeck";
import { StudyModeCard } from "@/components/set-detail/StudyModeCard";
import { Text } from "@/components/ui/text";
import { useAppTheme } from "@/constants/appTheme";
import {
  FREE_LEARN_SESSIONS_PER_SET,
  FREE_TEST_SESSIONS_PER_SET,
} from "@/constants/limits";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useProGate } from "@/hooks/use-pro-gate";
import {
  FLASHCARD_DAILY_LIMIT_UPSELL,
  isFlashcardDailyLimitReached,
} from "@/services/flashcardLimits";
import useLimitsStorage from "@/stores/limitsStorage";
import useSetsStorage from "@/stores/setsStorage";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SquarePen } from "lucide-react-native";
import { Pressable, ScrollView, View } from "react-native";
import { useShallow } from "zustand/react/shallow";

export default function SetDetailScreen() {
  const theme = useAppTheme();
  const colorScheme = useColorScheme();
  const statusBarStyle = colorScheme === "dark" ? "light" : "dark";
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { storedSets } = useSetsStorage(
    useShallow((state) => ({
      storedSets: state.storedSets,
    })),
  );
  const set = storedSets.find((set) => set.id === id);

  const { sheetRef, sheetProps, tryProceed } = useProGate();
  const {
    flashcardSetsToday,
    learnSessionsToday,
    testSessionsToday,
    ensureFreshDay,
    recordFlashcardSet,
    incrementLearnSession,
    incrementTestSession,
  } = useLimitsStorage();

  const handleNavigateToEdit = () => {
    if (!id) return;
    router.push({
      pathname: "/edit/[id]",
      params: { id },
    });
  };

  const handleStartFlashcardSession = () => {
    ensureFreshDay();
    const limitReached = isFlashcardDailyLimitReached(
      id ?? "",
      flashcardSetsToday,
    );
    const allowed = tryProceed(limitReached, FLASHCARD_DAILY_LIMIT_UPSELL);
    if (allowed) {
      recordFlashcardSet(id ?? "");
      router.push(`/flashcard/${id}`);
    }
  };

  const handleStartLearnSession = () => {
    if (!id) return;
    ensureFreshDay();
    const count = learnSessionsToday[id] ?? 0;
    const allowed = tryProceed(count >= FREE_LEARN_SESSIONS_PER_SET, {
      title: "Learn session limit reached",
      description: `You've used all ${FREE_LEARN_SESSIONS_PER_SET} free learn sessions for this set today. Go Pro for unlimited.`,
    });
    if (allowed) {
      incrementLearnSession(id);
      router.push(`/learn/${id}`);
    }
  };

  const handleStartTestSession = () => {
    if (!id) return;
    ensureFreshDay();
    const count = testSessionsToday[id] ?? 0;
    const allowed = tryProceed(count >= FREE_TEST_SESSIONS_PER_SET, {
      title: "Test session limit reached",
      description: `You've used all ${FREE_TEST_SESSIONS_PER_SET} free test sessions for this set today. Go Pro for unlimited.`,
    });
    if (allowed) {
      incrementTestSession(id);
      router.push(`/test/${id}`);
    }
  };

  if (!set) {
    return (
      <>
        <StatusBar style={statusBarStyle} />
        <View
          className="flex-1 items-center justify-center"
          style={{ backgroundColor: theme.bg }}
        >
          <Text style={{ color: theme.textMuted }}>Set not found</Text>
        </View>
      </>
    );
  }

  return (
    <>
      <StatusBar style={statusBarStyle} />
      <ScrollView className="flex-1" style={{ backgroundColor: theme.bg }}>
        {/* Header */}
        <View className="flex-row items-center justify-between pl-5 pr-2 pb-4 pt-2">
          <Pressable onPress={() => router.back()} className="w-10">
            <Ionicons name="chevron-back" size={24} color={theme.text} />
          </Pressable>
          <View className="flex-1 items-center">
            <Text className="text-lg font-bold" style={{ color: theme.text }}>
              {set.title}
            </Text>
            <Text
              className="mt-0.5 text-[10px] font-extrabold uppercase tracking-widest"
              style={{ color: theme.textFaint }}
            >
              Flashcard sets
            </Text>
          </View>
          <Pressable onPress={handleNavigateToEdit} className="w-10">
            <SquarePen size={24} color={theme.text} />
          </Pressable>
        </View>

        {/* Flashcard Deck */}
        <View className="mb-8 mt-4">
          <FlashCardDeck items={set.items} />
        </View>

        {/* Study Mode Section */}
        <View className="mb-6">
          <Text
            className="mb-4 px-5 text-[10px] font-extrabold uppercase tracking-widest"
            style={{ color: theme.textFaint }}
          >
            CHOOSE A STUDY MODE
          </Text>

          <StudyModeCard
            title="Flashcards"
            description="Review terms with flip cards"
            iconName="albums-outline"
            iconColor={theme.accentStart}
            iconBgColor={theme.accentSurface}
            onPress={handleStartFlashcardSession}
          />
          <StudyModeCard
            title="Learn"
            description="Adaptive learning with spaced repetition"
            iconName="school-outline"
            iconColor="#ad46ff"
            iconBgColor="rgba(173,70,255,0.1)"
            onPress={handleStartLearnSession}
          />
          <StudyModeCard
            title="Test"
            description="Test your knowledge with a quiz"
            iconName="checkmark-circle-outline"
            iconColor="#00bc7d"
            iconBgColor="rgba(0,188,125,0.1)"
            onPress={handleStartTestSession}
          />
        </View>
      </ScrollView>

      <ProUpsellSheet
        sheetRef={sheetRef}
        title={sheetProps.title}
        description={sheetProps.description}
      />
    </>
  );
}
