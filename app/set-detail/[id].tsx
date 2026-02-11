import { FlashCardDeck } from "@/components/set-detail/FlashCardDeck";
import { StudyModeCard } from "@/components/set-detail/StudyModeCard";
import { Text } from "@/components/ui/text";
import { useSets } from "@/hooks/use-sets";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, ScrollView, View } from "react-native";

export default function SetDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getSet } = useSets();
  const router = useRouter();

  const set = getSet(id);

  if (!set) {
    return (
      <View className="flex-1 items-center justify-center bg-[#121318]">
        <Text className="text-[#a0a4b8]">Set not found</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-[#121318]">
      {/* Header */}
      <View className="flex-row items-center justify-between px-5 pb-4 pt-2">
        <Pressable onPress={() => router.back()} className="w-10">
          <Ionicons name="chevron-back" size={24} color="#e8eaf0" />
        </Pressable>
        <View className="flex-1 items-center">
          <Text className="text-lg font-bold text-[#e8eaf0]">{set.title}</Text>
          <Text
            className="mt-0.5 text-[10px] font-extrabold uppercase tracking-widest"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            STUDY SESSION
          </Text>
        </View>
        <View className="w-10" />
      </View>

      {/* Flashcard Deck */}
      <View className="mb-8 mt-4">
        <FlashCardDeck items={set.items} />
      </View>

      {/* Study Mode Section */}
      <View className="mb-6">
        <Text
          className="mb-4 px-5 text-[10px] font-extrabold uppercase tracking-widest"
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          CHOOSE A STUDY MODE
        </Text>

        <StudyModeCard
          title="Flashcards"
          description="Review terms with flip cards"
          iconName="albums-outline"
          iconColor="#5b6cff"
          iconBgColor="rgba(91,108,255,0.1)"
          onPress={() => router.push(`/flashcard/${id}`)}
        />
        <StudyModeCard
          title="Learn"
          description="Adaptive learning with spaced repetition"
          iconName="school-outline"
          iconColor="#ad46ff"
          iconBgColor="rgba(173,70,255,0.1)"
          onPress={() => router.push(`/learn/${id}`)}
        />
        <StudyModeCard
          title="Test"
          description="Test your knowledge with a quiz"
          iconName="checkmark-circle-outline"
          iconColor="#00bc7d"
          iconBgColor="rgba(0,188,125,0.1)"
          onPress={() => router.push(`/test/${id}`)}
        />
      </View>
    </ScrollView>
  );
}
