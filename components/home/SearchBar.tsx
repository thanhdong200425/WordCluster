import { Ionicons } from "@expo/vector-icons";
import { TextInput, View } from "react-native";

interface SearchBarProps {
  placeholder?: string;
}

export function SearchBar({
  placeholder = "Search roots (e.g., struct, bene)",
}: SearchBarProps) {
  return (
    <View className="mx-5 my-3 flex-row items-center gap-2 rounded-[18px] bg-[#1c1e26] px-4 py-3">
      <Ionicons name="search" size={20} color="#a0a4b8" />
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#a0a4b8"
        className="flex-1 text-base text-white"
      />
    </View>
  );
}
