import { TermCard } from "@/components/create-set/TermCard";
import { TitleSection } from "@/components/create-set/TitleSection";
import { Text } from "@/components/ui/text";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useCallback, useState } from "react";
import { Pressable, ScrollView, View } from "react-native";

interface TermItem {
  id: string;
  term: string;
  definition: string;
}

function createEmptyItem(): TermItem {
  return { id: Date.now().toString(), term: "", definition: "" };
}

export default function CreateSetScreen() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [showDescription, setShowDescription] = useState(false);
  const [items, setItems] = useState<TermItem[]>([
    createEmptyItem(),
    createEmptyItem(),
  ]);

  const handleAddCard = useCallback(() => {
    setItems((prev) => [...prev, createEmptyItem()]);
  }, []);

  const handleTermChange = useCallback((id: string, text: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, term: text } : item)),
    );
  }, []);

  const handleDefinitionChange = useCallback((id: string, text: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, definition: text } : item,
      ),
    );
  }, []);

  return (
    <View className="flex-1 bg-[#121318]">
      {/* Header */}
      <View className="flex-row items-center justify-between border-b border-[#e2e8f0] px-4 py-3">
        <Pressable onPress={() => router.back()} hitSlop={8}>
          <Ionicons name="chevron-back" size={24} color="white" />
        </Pressable>
        <Text className="text-lg font-bold text-white">Create set</Text>
        <Pressable hitSlop={8}>
          <Ionicons name="checkmark" size={28} color="white" />
        </Pressable>
      </View>

      {/* Content */}
      <ScrollView className="flex-1" keyboardShouldPersistTaps="handled">
        <TitleSection
          title={title}
          onTitleChange={setTitle}
          description={description}
          onDescriptionChange={setDescription}
          showDescription={showDescription}
          onToggleDescription={() => setShowDescription(true)}
        />

        <View className="mt-4">
          {items.map((item, index) => (
            <TermCard
              key={item.id + Math.random()}
              index={index + 1}
              term={item.term}
              onTermChange={(text) => handleTermChange(item.id, text)}
              definition={item.definition}
              onDefinitionChange={(text) =>
                handleDefinitionChange(item.id, text)
              }
            />
          ))}
        </View>
      </ScrollView>

      {/* FAB */}
      <Pressable
        onPress={handleAddCard}
        className="absolute bottom-6 right-6 h-14 w-14 items-center justify-center rounded-full bg-[#4255ff] shadow-lg"
      >
        <Ionicons name="add" size={28} color="white" />
      </Pressable>
    </View>
  );
}
