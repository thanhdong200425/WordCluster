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
import { StoredSet } from "@/types/set";
import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import Toast from "react-native-toast-message";
import NotFoundScreen from "./+not-found";

interface CreateSetScreenProps {
  isEditMode?: boolean;
  setId?: string;
}

export default function CreateSetScreen({
  isEditMode = false,
  setId,
}: CreateSetScreenProps) {
  const [showDescription, setShowDescription] = useState<boolean>(true);
  const [currentSetData, setCurrentSetData] = useState<StoredSet | null>(null);
  const [isMissingSet, setIsMissingSet] = useState<boolean>(false);
  const { createSet, getSet, updateSet, isLoading } = useSets();

  useEffect(() => {
    if (!isEditMode && isLoading) return;
    if (isEditMode && setId) {
      const set = getSet(setId);
      if (set) {
        setCurrentSetData(set);
        setIsMissingSet(false);
        reset({
          title: set.title,
          description: set.description,
          items: set.items.map((item) => ({
            term: item.term,
            definition: item.definition,
            example: item.example,
            type: item.type,
          })),
        });
      } else if (!isLoading && !set) {
        setIsMissingSet(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditMode, setId, getSet]);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    reset,
  } = useForm<CreateSetFormData>({
    mode: "onSubmit",
    resolver: zodResolver(createSetSchema),
    defaultValues: {
      title: currentSetData?.title || "",
      description: currentSetData?.description || "",
      items: currentSetData?.items.map((item) => ({
        term: item.term,
        definition: item.definition,
        example: item.example,
        type: item.type,
      })) || [{ term: "", definition: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  if (isEditMode && isLoading) {
    return <ActivityIndicator size="large" color="#94a3b8" />;
  }

  if (isEditMode && isMissingSet) {
    return <NotFoundScreen />;
  }

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
    if (isEditMode ? !isDirty : !isValid) return;

    if (isEditMode) {
      if (!setId) return;
      await updateSet(setId, data);
    } else {
      await createSet(data);
    }
    Toast.show({
      type: "success",
      text1: isEditMode
        ? "Set updated successfully"
        : "Set created successfully",
    });
    router.back();
  };

  return (
    <View className="flex-1 bg-[#121318]">
      {/* Header */}
      <View className="flex-row items-center justify-between border-b border-[#e2e8f0] px-4 py-3">
        <Pressable onPress={() => router.back()} hitSlop={8}>
          <Ionicons name="chevron-back" size={24} color="white" />
        </Pressable>
        <Text className="text-lg font-bold text-white">
          {isEditMode ? "Edit set" : "Create set"}
        </Text>
        <Pressable
          onPress={handleSubmit(onSubmit)}
          hitSlop={8}
          disabled={isEditMode ? !isDirty : !isValid}
        >
          <Ionicons
            name="checkmark"
            size={28}
            color={(isEditMode ? !isDirty : !isValid) ? "#94a3b8" : "white"}
          />
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
  actionContainer: { backgroundColor: undefined },
});
