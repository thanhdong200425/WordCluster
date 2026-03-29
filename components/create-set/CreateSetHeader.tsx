import { AppTheme } from "@/constants/appTheme";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Button } from "heroui-native/button";
import { PressableFeedback } from "heroui-native/pressable-feedback";
import { StyleSheet, Text, View } from "react-native";

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
      style={[
        styles.container,
        {
          backgroundColor: t.surface,
          borderBottomColor: t.border,
        },
      ]}
    >
      <PressableFeedback
        onPress={() => router.back()}
        className="flex-row items-center gap-1.5"
        style={styles.backButton}
      >
        <Ionicons name="chevron-back" size={18} color={t.textMuted} />
        <Text style={[styles.backText, { color: t.textMuted }]}>Back</Text>
      </PressableFeedback>

      <Text style={[styles.title, { color: t.text }]}>
        {isEditMode ? "Edit Set" : "Create Set"}
      </Text>

      <Button
        onPress={onSubmit}
        isDisabled={isSubmitDisabled}
        feedbackVariant="scale-highlight"
        className="min-w-[72px] rounded-full px-4 py-0"
        style={[
          styles.ctaButton,
          {
            backgroundColor: isSubmitDisabled ? t.surface2 : t.accentStart,
          },
        ]}
      >
        <Button.Label
          className={isSubmitDisabled ? "text-[#94A3B8]" : "text-white"}
        >
          {isEditMode ? "Save" : "Create"}
        </Button.Label>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 66,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 16,
  },
  backButton: {
    minWidth: 72,
  },
  backText: {
    fontSize: 15,
    fontWeight: "400",
  },
  title: {
    position: "absolute",
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 17,
    fontWeight: "700",
    letterSpacing: -0.3,
  },
  ctaButton: {
    height: 38,
  },
});
