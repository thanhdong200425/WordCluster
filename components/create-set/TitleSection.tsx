import { Text } from "@/components/ui/text";
import type { CreateSetFormData } from "@/schemas/create-set-schema";
import { type FieldErrors } from "react-hook-form";
import { TextInput, View } from "react-native";

interface TitleSectionProps {
  errors: FieldErrors<CreateSetFormData>;
  value: string;
  onChange: (text: string) => void;
  onBlur: () => void;
}

export function TitleSection({
  errors,
  value,
  onChange,
  onBlur,
}: TitleSectionProps) {
  return (
    <View className="px-5 py-4">
      <View className="mb-1 border-b border-[#cbd5e1]">
        <TextInput
          value={value}
          onChangeText={onChange}
          onBlur={onBlur}
          placeholder="Subject, chapter, unit"
          placeholderTextColor="#a0a4b8"
          className="pb-2 text-[20px] font-medium text-white"
        />
      </View>
      <Text className="mb-1 text-[10px] font-bold uppercase tracking-widest text-[#94a3b8]">
        TITLE
      </Text>
      {errors.title && (
        <Text className="mb-2 text-xs text-red-500">
          {errors.title.message}
        </Text>
      )}
    </View>
  );
}
