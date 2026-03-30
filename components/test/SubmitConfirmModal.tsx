import { Text } from "@/components/ui/text";
import { useAppTheme } from "@/constants/appTheme";
import { Modal, Pressable, View } from "react-native";

interface SubmitConfirmModalProps {
  visible: boolean;
  unansweredCount: number;
  onConfirm: () => void;
  onCancel: () => void;
}

export function SubmitConfirmModal({
  visible,
  unansweredCount,
  onConfirm,
  onCancel,
}: SubmitConfirmModalProps) {
  const theme = useAppTheme();
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <Pressable
        className="flex-1 items-center justify-center bg-[rgba(0,0,0,0.7)]"
        onPress={onCancel}
      >
        <Pressable
          className="mx-8 w-full rounded-2xl border p-7"
          style={{
            backgroundColor: theme.surface,
            borderColor: theme.border,
          }}
        >
          <Text className="text-center text-[32px]">{"⚠️"}</Text>

          <Text
            className="mt-3 text-center text-[18px] font-extrabold"
            style={{ color: theme.text }}
          >
            Submit with unanswered?
          </Text>

          <Text
            className="mt-2 text-center text-[13px]"
            style={{ color: theme.textMuted }}
          >
            {unansweredCount} question{unansweredCount !== 1 ? "s" : ""} will be
            marked wrong.
          </Text>

          <View className="mt-6 flex-row gap-3">
            <Pressable
              onPress={onCancel}
              className="flex-1 items-center rounded-xl border-[1.5px] bg-transparent py-3.5"
              style={{ borderColor: theme.border }}
            >
              <Text className="font-semibold" style={{ color: theme.textFaint }}>
                Go Back
              </Text>
            </Pressable>

            <Pressable
              onPress={onConfirm}
              className="flex-1 items-center rounded-xl py-3.5"
              style={{ backgroundColor: "#ff6b8a" }}
            >
              <Text className="font-bold text-white">Submit Anyway</Text>
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
