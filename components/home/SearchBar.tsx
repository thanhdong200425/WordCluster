import { useAppTheme } from "@/constants/appTheme";
import { Ionicons } from "@expo/vector-icons";
import { TextInput, View } from "react-native";

interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
}

export function SearchBar({
  placeholder = "Search roots (e.g., struct, bene)",
  value,
  onChangeText,
}: SearchBarProps) {
  const theme = useAppTheme();

  return (
    <View
      className="mx-5 my-3 flex-row items-center gap-2 rounded-[18px] border px-4 py-3"
      style={{
        backgroundColor: theme.surface2,
        borderColor: theme.border,
      }}
    >
      <Ionicons name="search" size={20} color={theme.textMuted} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.textFaint}
        className="flex-1 text-base"
        style={{ color: theme.text }}
      />
    </View>
  );
}
