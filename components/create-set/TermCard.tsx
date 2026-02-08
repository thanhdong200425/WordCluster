import { Text } from "@/components/ui/text";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, TextInput, View } from "react-native";

interface TermCardProps {
  index: number;
  term: string;
  onTermChange: (text: string) => void;
  definition: string;
  onDefinitionChange: (text: string) => void;
}

export function TermCard({
  index,
  term,
  onTermChange,
  definition,
  onDefinitionChange,
}: TermCardProps) {
  return (
    <View className="mx-5 mb-4 rounded-lg bg-[#282b37] p-5 shadow-sm">
      <Text className="mb-4 text-sm font-bold text-white">{index}</Text>

      <View className="mb-1 rounded-[14px] border-2 border-white px-4 py-2.5">
        <TextInput
          value={term}
          onChangeText={onTermChange}
          placeholder="Enter term"
          placeholderTextColor="#a0a4b8"
          className="text-[18px] text-[#e8eaf0]"
        />
      </View>
      <Text className="mb-4 text-[10px] font-bold uppercase tracking-widest text-[#e8eaf0]">
        TERM
      </Text>

      <View className="mb-1 rounded-[14px] border-2 border-white px-4 py-2.5">
        <TextInput
          value={definition}
          onChangeText={onDefinitionChange}
          placeholder="Enter definition"
          placeholderTextColor="#a0a4b8"
          className="text-[18px] text-[#e8eaf0]"
        />
      </View>
      <Text className="mb-4 text-[10px] font-bold uppercase tracking-widest text-[#e8eaf0]">
        DEFINITION
      </Text>

      <Pressable className="flex-row items-center self-start rounded-full bg-white/10 px-4 py-2">
        <Ionicons name="add" size={16} color="#e8eaf0" />
        <Text className="mx-1.5 text-sm font-semibold text-[#e8eaf0]">
          Add field
        </Text>
        <Ionicons name="chevron-down" size={14} color="#e8eaf0" />
      </Pressable>
    </View>
  );
}
