import { Text } from "@/components/ui/text";
import type { CreateSetFormData } from "@/schemas/create-set-schema";
import { Ionicons } from "@expo/vector-icons";
import { Controller, type Control, type FieldErrors } from "react-hook-form";
import { Pressable, TextInput, View } from "react-native";

interface TermCardProps {
  index: number;
  control: Control<CreateSetFormData>;
  errors?: FieldErrors<CreateSetFormData["items"][number]>;
}

export function TermCard({ index, control, errors }: TermCardProps) {
  return (
    <View className="mx-5 mb-4 rounded-lg bg-[#282b37] p-5 shadow-sm">
      <Text className="mb-4 text-sm font-bold text-white">{index + 1}</Text>

      <View className="mb-1 rounded-[14px] border-2 border-white px-4 py-2.5">
        <Controller
          control={control}
          name={`items.${index}.term`}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder="Enter term"
              placeholderTextColor="#a0a4b8"
              className="text-[18px] text-[#e8eaf0]"
            />
          )}
        />
      </View>
      <Text className="mb-1 text-[10px] font-bold uppercase tracking-widest text-[#e8eaf0]">
        TERM
      </Text>
      {errors?.term && (
        <Text className="mb-2 text-xs text-red-500">{errors.term.message}</Text>
      )}

      <View className="mb-1 rounded-[14px] border-2 border-white px-4 py-2.5">
        <Controller
          control={control}
          name={`items.${index}.definition`}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder="Enter definition"
              placeholderTextColor="#a0a4b8"
              className="text-[18px] text-[#e8eaf0]"
            />
          )}
        />
      </View>
      <Text className="mb-1 text-[10px] font-bold uppercase tracking-widest text-[#e8eaf0]">
        DEFINITION
      </Text>
      {errors?.definition && (
        <Text className="mb-2 text-xs text-red-500">
          {errors.definition.message}
        </Text>
      )}

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
