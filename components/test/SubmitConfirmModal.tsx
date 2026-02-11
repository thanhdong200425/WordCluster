import { Text } from "@/components/ui/text";
import { Modal, Pressable, StyleSheet, View } from "react-native";

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
      <Pressable style={styles.backdrop} onPress={onCancel}>
        <Pressable style={styles.card} className="mx-8 rounded-2xl p-7">
          <Text style={{ fontSize: 32, textAlign: "center" }}>{"⚠️"}</Text>

          <Text
            className="mt-3 text-center font-extrabold text-[#e8eaf0]"
            style={{ fontSize: 18 }}
          >
            Submit with unanswered?
          </Text>

          <Text
            className="mt-2 text-center"
            style={{ fontSize: 13, color: "#6b7080" }}
          >
            {unansweredCount} question{unansweredCount !== 1 ? "s" : ""} will be
            marked wrong.
          </Text>

          <View className="mt-6 flex-row gap-3">
            <Pressable
              onPress={onCancel}
              style={styles.cancelButton}
              className="flex-1 items-center rounded-xl py-3.5"
            >
              <Text className="font-semibold" style={{ color: "#a0a4b8" }}>
                Go Back
              </Text>
            </Pressable>

            <Pressable
              onPress={onConfirm}
              style={styles.confirmButton}
              className="flex-1 items-center rounded-xl py-3.5"
            >
              <Text className="font-bold text-white">Submit Anyway</Text>
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#1c1e26",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    width: "100%",
  },
  cancelButton: {
    backgroundColor: "transparent",
    borderWidth: 1.5,
    borderColor: "rgba(255,255,255,0.1)",
  },
  confirmButton: {
    backgroundColor: "#ff6b8a",
  },
});
