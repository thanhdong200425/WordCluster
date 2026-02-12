import RightDeleteAction from "@/components/common/RightDeleteAction";
import DescriptionSection from "@/components/create-set/DescriptionSection";
import { TermCard } from "@/components/create-set/TermCard";
import { TitleSection } from "@/components/create-set/TitleSection";
import { Text } from "@/components/ui/text";
import { useSets } from "@/hooks/use-sets";
import {
  CreateSetFormData,
  createSetSchema,
} from "@/schemas/create-set-schema";
import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import Toast from "react-native-toast-message";

export default function CreateSetScreen() {
  const [showDescription, setShowDescription] = useState<boolean>(true);
  const { createSet } = useSets();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<CreateSetFormData>({
    mode: "onSubmit",
    resolver: zodResolver(createSetSchema),
    defaultValues: {
      title: "",
      description: "",
      items: [
        { term: "", definition: "" },
        { term: "", definition: "" },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const handleDeleteTerm = (index: number) => {
    if (fields.length === 1) {
      Toast.show({
        type: "error",
        text1: "At least 1 term is required",
      });
      return;
    }
    remove(index);
  };

  const onSubmit = async (data: CreateSetFormData) => {
    if (!isValid) return;
    await createSet(data);
    router.back();
  };

  return (
    <View className="flex-1 bg-[#121318]">
      {/* Header */}
      <View className="flex-row items-center justify-between border-b border-[#e2e8f0] px-4 py-3">
        <Pressable onPress={() => router.back()} hitSlop={8}>
          <Ionicons name="chevron-back" size={24} color="white" />
        </Pressable>
        <Text className="text-lg font-bold text-white">Create set</Text>
        <Pressable
          onPress={handleSubmit(onSubmit)}
          hitSlop={8}
          disabled={!isValid}
        >
          <Pressable onPress={handleSubmit(onSubmit)} hitSlop={8}>
            <Ionicons
              name="checkmark"
              size={28}
              color={isValid ? "white" : "#94a3b8"}
            />
          </Pressable>
        </Pressable>
      </View>

      {/* Content */}
      <ScrollView className="flex-1" keyboardShouldPersistTaps="handled">
        <Controller
          control={control}
          name="title"
          render={({ field: { onChange, onBlur, value } }) => (
            <TitleSection
              errors={errors}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
            />
          )}
        />

        <Controller
          control={control}
          name="description"
          render={({ field: { onChange, onBlur, value } }) => (
            <DescriptionSection
              compactMode={showDescription}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              onToggleCompactMode={() => setShowDescription(!showDescription)}
            />
          )}
        />

        <View className="mt-4">
          {fields.map((field, index) => (
            <ReanimatedSwipeable
              key={field.id}
              renderRightActions={(prog, drag) =>
                RightDeleteAction({
                  progress: prog,
                  drag,
                  setId: field.id,
                  onDelete: () => handleDeleteTerm(index),
                  containerStyle: styles.actionContainer,
                  buttonClassName: "h-1/3 bg-red-500 rounded-3xl",
                })
              }
            >
              <TermCard
                key={field.id}
                index={index}
                control={control}
                errors={errors.items?.[index]}
              />
            </ReanimatedSwipeable>
          ))}
        </View>

        {errors.items?.root && (
          <Text className="mx-5 mb-4 text-sm text-red-500">
            {errors.items.root.message}
          </Text>
        )}
      </ScrollView>

      {/* FAB */}
      <Pressable
        onPress={() => append({ term: "", definition: "" })}
        className="absolute bottom-6 right-6 h-14 w-14 items-center justify-center rounded-full bg-[#4255ff] shadow-lg"
      >
        <Ionicons name="add" size={28} color="white" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  actionContainer: {
    backgroundColor: undefined,
  },
});
