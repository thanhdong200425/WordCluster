import { AppTheme } from "@/constants/appTheme";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { PressableFeedback } from "heroui-native/pressable-feedback";
import { Text, View } from "react-native";

interface CreateSetHeaderProps {
  isEditMode: boolean;
  isSubmitDisabled: boolean;
  t: AppTheme;
  onSubmit: () => void;
}

export function CreateSetHeader({
  isEditMode,
  isSubmitDisabled,
  t,
  onSubmit,
}: CreateSetHeaderProps) {
  const router = useRouter();

  return (
    <View
      className="relative h-[66px] flex-row items-center border-b px-4"
      style={{
        backgroundColor: t.surface,
        borderBottomColor: t.border,
      }}
    >
      <View
        className="absolute inset-x-0 top-0 bottom-0 items-center justify-center px-12"
        pointerEvents="none"
      >
        <Text
          className="text-center text-[17px] font-bold tracking-[-0.3px]"
          style={{ color: t.text }}
          numberOfLines={1}
        >
          {isEditMode ? "Edit Set" : "Create Set"}
        </Text>
      </View>

      <View
        className="z-10 flex-1 flex-row items-center justify-start"
        pointerEvents="box-none"
      >
        <PressableFeedback
          onPress={() => router.back()}
          className="h-10 w-10 items-center justify-center rounded-full"
          style={{ backgroundColor: t.surface2 }}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <Ionicons name="chevron-back" size={20} color={t.textMuted} />
        </PressableFeedback>
      </View>

      <View
        className="z-10 flex-1 flex-row items-center justify-end"
        pointerEvents="box-none"
      >
        <PressableFeedback
          onPress={onSubmit}
          isDisabled={isSubmitDisabled}
          className="h-10 w-10 items-center justify-center rounded-full"
          style={{
            backgroundColor: isSubmitDisabled ? t.surface2 : t.accentStart,
            opacity: isSubmitDisabled ? 0.7 : 1,
          }}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          accessibilityRole="button"
          accessibilityLabel={isEditMode ? "Save set" : "Create set"}
          accessibilityState={{ disabled: isSubmitDisabled }}
        >
          <Ionicons
            name="checkmark"
            size={22}
            color={isSubmitDisabled ? t.textFaint : "#FFFFFF"}
          />
        </PressableFeedback>
      </View>
    </View>
  );
}
