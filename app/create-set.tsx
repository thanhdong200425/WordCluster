import { useAppTheme } from "@/constants/appTheme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import RightDeleteAction from "@/components/common/RightDeleteAction";
import { CreateSetHeader } from "@/components/create-set/CreateSetHeader";
import DescriptionSection from "@/components/create-set/DescriptionSection";
import { TermCard } from "@/components/create-set/TermCard";
import { TitleSection } from "@/components/create-set/TitleSection";
import { Text } from "@/components/ui/text";
import {
  CreateSetFormData,
  createSetSchema,
} from "@/schemas/create-set-schema";
import useSetsStorage from "@/stores/setsStorage";
import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { StatusBar } from "expo-status-bar";
import { Button } from "heroui-native/button";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import Toast from "react-native-toast-message";
import { useShallow } from "zustand/react/shallow";
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
  const [isMissingSet, setIsMissingSet] = useState<boolean>(false);
  const t = useAppTheme();
  const colorScheme = useColorScheme();
  const { createSet, updateSet, isLoading, storedSets } = useSetsStorage(
    useShallow((state) => ({
      createSet: state.createSet,
      updateSet: state.updateSet,
      isLoading: state.isLoading,
      storedSets: state.storedSets,
    })),
  );

  useEffect(() => {
    if (!isEditMode && isLoading) return;
    if (isEditMode && setId) {
      const set = storedSets.find((set) => set.id === setId);
      if (set) {
        setIsMissingSet(false);
        setShowDescription(!set.description);
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
  }, [isEditMode, setId, storedSets]);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    reset,
  } = useForm<CreateSetFormData>({
    mode: "onSubmit",
    resolver: zodResolver(createSetSchema),
    defaultValues: {
      title: "",
      description: "",
      items: [{ term: "", definition: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  if (isEditMode && isLoading) {
    return (
      <View
        style={[
          styles.loaderContainer,
          {
            backgroundColor: t.bg,
          },
        ]}
      >
        <ActivityIndicator size="large" color={t.accentStart} />
      </View>
    );
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
    <View style={[styles.screen, { backgroundColor: t.bg }]}>
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
      <CreateSetHeader
        isEditMode={isEditMode}
        isSubmitDisabled={isEditMode ? !isDirty : !isValid}
        t={t}
        onSubmit={handleSubmit(onSubmit)}
      />

      <KeyboardAwareScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.contentContainer}
        bottomOffset={50}
        keyboardShouldPersistTaps="handled"
      >
        <Controller
          control={control}
          name="title"
          render={({ field: { onChange, onBlur, value } }) => (
            <TitleSection
              errors={errors}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              t={t}
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
              t={t}
            />
          )}
        />

        <View className="px-4 pt-6">
          <Text
            style={[
              styles.termCount,
              {
                color: t.textMuted,
              },
            ]}
          >
            {fields.length} {fields.length === 1 ? "Term" : "Terms"}
          </Text>
        </View>

        <View className="px-4 pt-3">
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
                  buttonClassName: "h-1/3 rounded-3xl bg-red-500",
                })
              }
              containerStyle={styles.swipeContainer}
            >
              <View style={styles.cardWrap}>
                <TermCard
                  key={field.id}
                  index={index}
                  control={control}
                  errors={errors.items?.[index]}
                  t={t}
                />
              </View>
            </ReanimatedSwipeable>
          ))}
        </View>

        {errors.items?.root && (
          <Text className="mx-5 mb-4 mt-2 text-sm text-red-500">
            {errors.items.root.message}
          </Text>
        )}

        <View className="px-4 pb-8 pt-2">
          <Button
            onPress={() => append({ term: "", definition: "" })}
            variant="outline"
            feedbackVariant="scale-highlight"
            className="w-full rounded-2xl border-dashed px-4 py-0"
            style={[
              styles.addTermButton,
              {
                borderColor: t.border2,
                backgroundColor: colorScheme === "dark" ? t.surface : "transparent",
              },
            ]}
          >
            <Ionicons name="add" size={18} color={t.accentStart} />
            <Button.Label
              className="text-[15px]"
              style={{ color: t.accentStart }}
            >
              Add Term
            </Button.Label>
          </Button>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  actionContainer: { backgroundColor: undefined },
  screen: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 28,
  },
  cardWrap: {
    marginBottom: 10,
  },
  swipeContainer: {
    marginBottom: 2,
  },
  loaderContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  termCount: {
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 1.2,
    textTransform: "uppercase",
    marginLeft: 2,
  },
  addTermButton: {
    height: 56,
    borderWidth: 1.5,
  },
});
