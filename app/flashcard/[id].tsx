import { FlashcardScreen } from "@/components/flashcard/FlashcardScreen";
import { useLocalSearchParams } from "expo-router";

export default function FlashcardRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return <FlashcardScreen setId={id} />;
}
