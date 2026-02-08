import { Text } from "@/components/ui/text";
import { Pressable, TextInput, View } from "react-native";

interface TitleSectionProps {
  title: string;
  onTitleChange: (text: string) => void;
  description: string;
  onDescriptionChange: (text: string) => void;
  showDescription: boolean;
  onToggleDescription: () => void;
}

export function TitleSection({
  title,
  onTitleChange,
  description,
  onDescriptionChange,
  showDescription,
  onToggleDescription,
}: TitleSectionProps) {
  return (
    <View className="px-5 py-4">
      <View className="mb-1 border-b border-[#cbd5e1]">
        <TextInput
          value={title}
          onChangeText={onTitleChange}
          placeholder="Subject, chapter, unit"
          placeholderTextColor="#a0a4b8"
          className="pb-2 text-[20px] font-medium text-white"
        />
      </View>
      <Text className="mb-3 text-[10px] font-bold uppercase tracking-widest text-[#94a3b8]">
        TITLE
      </Text>

      {showDescription ? (
        <>
          <View className="mb-1 border-b border-[#cbd5e1]">
            <TextInput
              value={description}
              onChangeText={onDescriptionChange}
              placeholder="Add a description..."
              placeholderTextColor="#a0a4b8"
              className="pb-2 text-[20px] font-medium text-white"
              multiline
            />
          </View>
          <Text className="text-[10px] font-bold uppercase tracking-widest text-[#94a3b8]">
            DESCRIPTION
          </Text>
        </>
      ) : (
        <Pressable onPress={onToggleDescription}>
          <Text className="text-sm font-bold text-[#4255ff]">
            + Description
          </Text>
        </Pressable>
      )}
    </View>
  );
}
