import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icon } from "@/components/ui/icon";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";
import type { CreateSetFormData } from "@/schemas/create-set-schema";
import { Ionicons } from "@expo/vector-icons";
import { Layers, StickyNote, Tag } from "lucide-react-native";
import { useState } from "react";
import { Controller, type Control, type FieldErrors } from "react-hook-form";
import { Pressable, TextInput, View } from "react-native";

export type AddFieldType = "example" | "type" | "wordFamily";

const TYPE_OPTIONS = [
  { label: "Noun", value: "noun" },
  { label: "Verb", value: "verb" },
  { label: "Adjective", value: "adjective" },
  { label: "Adverb", value: "adverb" },
  { label: "Pronoun", value: "pronoun" },
  { label: "Preposition", value: "preposition" },
  { label: "Conjunction", value: "conjunction" },
  { label: "Interjection", value: "interjection" },
];

interface TermCardProps {
  index: number;
  control: Control<CreateSetFormData>;
  errors?: FieldErrors<CreateSetFormData["items"][number]>;
}

export function TermCard({ index, control, errors }: TermCardProps) {
  const [visibleFields, setVisibleFields] = useState<Set<AddFieldType>>(
    new Set(),
  );

  const handleAddField = (type: AddFieldType) => {
    setVisibleFields((prev) => new Set(prev).add(type));
  };

  const hasAllFields =
    visibleFields.has("example") && visibleFields.has("type");

  return (
    <View className="mx-5 mb-4 rounded-lg bg-[#282b37] p-5 shadow-sm flex">
      <Text className="mb-4 text-sm font-bold text-white">{index + 1}</Text>


        <CustomInput
        control={control}
        index={index}
        name="term"
        placeholder="Enter term"
        label="TERM"
        error={errors?.term?.message ?? ""}
      />

      <CustomInput
        control={control}
        index={index}
        name="definition"
        placeholder="Enter definition"
        label="DEFINITION"
        error={errors?.definition?.message ?? ""}
      />

      {visibleFields.has("example") && (
        <CustomInput
          control={control}
          index={index}
          name="example"
          placeholder="Enter example"
          label="EXAMPLE"
          error=""
        />
      )}

      {visibleFields.has("type") && (
        <>
          <Controller
            control={control}
            name={`items.${index}.type`}
            render={({ field: { onChange, value } }) => (
              <Select
                value={
                  value
                    ? (TYPE_OPTIONS.find((o) => o.value === value) ?? undefined)
                    : undefined
                }
                onValueChange={(option) => onChange(option?.value ?? "")}
              >
                <SelectTrigger className="mb-1 h-auto rounded-[14px] border-2 border-white bg-transparent px-4 py-2.5">
                  <SelectValue
                    className="text-[18px] text-[#e8eaf0]"
                    placeholder="Select type"
                  />
                </SelectTrigger>
                <SelectContent>
                  {TYPE_OPTIONS.map((option) => (
                    <SelectItem
                      key={option.value}
                      label={option.label}
                      value={option.value}
                      className="text-[18px] text-[#e8eaf0]"
                    />
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          <Text className="mb-1 text-[10px] font-bold uppercase tracking-widest text-[#e8eaf0]">
            TYPE
          </Text>
        </>
      )}

      {!hasAllFields && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Pressable className="flex-row items-center self-start rounded-full bg-white/10 px-4 py-2">
              <Ionicons name="add" size={16} color="#e8eaf0" />
              <Text className="mx-1.5 text-sm font-semibold text-[#e8eaf0]">
                Add field
              </Text>
              <Ionicons name="chevron-down" size={14} color="#e8eaf0" />
            </Pressable>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-48 rounded-xl border-white/10 bg-[#2d3142]"
            align="start"
            sideOffset={4}
          >
            {!visibleFields.has("example") && (
              <DropdownMenuItem
                className="gap-3 px-4 py-3"
                onPress={() => handleAddField("example")}
              >
                <Icon as={StickyNote} className="text-[#e8eaf0]" size={16} />
                <Text className="text-sm font-medium text-[#e8eaf0]">
                  Example
                </Text>
              </DropdownMenuItem>
            )}
            {!visibleFields.has("type") && (
              <DropdownMenuItem
                className="gap-3 px-4 py-3"
                onPress={() => handleAddField("type")}
              >
                <Icon as={Tag} className="text-[#e8eaf0]" size={16} />
                <Text className="text-sm font-medium text-[#e8eaf0]">Type</Text>
              </DropdownMenuItem>
            )}
            <DropdownMenuItem
              className="gap-3 px-4 py-3"
              onPress={() => handleAddField("wordFamily")}
            >
              <Icon as={Layers} className="text-[#e8eaf0]" size={16} />
              <Text className="text-sm font-medium text-[#e8eaf0]">
                Word family
              </Text>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </View>
  );
}

const CustomInput = ({
  control,
  index,
  name,
  placeholder,
  label,
  className,
  error,
}: {
  control: Control<CreateSetFormData>;
  index: number;
  name: keyof CreateSetFormData["items"][number];
  placeholder: string;
  label: string;
  className?: string;
  error: string;
}) => {
  return (
    <View className="mb-2">
      <View
        className={cn(
          "mb-1 rounded-[14px] border-2 border-white px-4 py-2.5",
          className,
        )}
      >
        <Controller
          control={control}
          name={`items.${index}.${name}`}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              placeholderTextColor="#a0a4b8"
              className="text-[18px] text-[#e8eaf0]"
            />
          )}
        />
      </View>
      <Text className="mb-1 text-[10px] font-bold uppercase tracking-widest text-[#e8eaf0]">
        {label}
      </Text>
      {error && <Text className="mb-2 text-xs text-red-500">{error}</Text>}
    </View>
  );
};
