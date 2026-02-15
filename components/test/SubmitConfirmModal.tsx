import { Text } from "@/components/ui/text";
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
        <Pressable className="mx-8 w-full rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#1c1e26] p-7">
          <Text className="text-center text-[32px]">{"⚠️"}</Text>

          <Text className="mt-3 text-center text-[18px] font-extrabold text-[#e8eaf0]">
            Submit with unanswered?
          </Text>

          <Text className="mt-2 text-center text-[13px] text-[#6b7080]">
            {unansweredCount} question{unansweredCount !== 1 ? "s" : ""} will be
            marked wrong.
          </Text>

          <View className="mt-6 flex-row gap-3">
            <Pressable
              onPress={onCancel}
              className="flex-1 items-center rounded-xl border-[1.5px] border-[rgba(255,255,255,0.1)] bg-transparent py-3.5"
            >
              <Text className="font-semibold text-[#a0a4b8]">
                Go Back
              </Text>
            </Pressable>

            <Pressable
              onPress={onConfirm}
              className="flex-1 items-center rounded-xl bg-[#ff6b8a] py-3.5"
            >
              <Text className="font-bold text-white">Submit Anyway</Text>
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
