import { Text } from "@/components/ui/text";
import { Pressable, StyleSheet, View } from "react-native";

interface SubmitBarProps {
  answeredCount: number;
  totalCount: number;
  onSubmit: () => void;
}

export function SubmitBar({
  answeredCount,
  totalCount,
  onSubmit,
}: SubmitBarProps) {
  const allAnswered = answeredCount >= totalCount;

  return (
    <View style={styles.container} className="px-5 pb-6 pt-3">
      <Text
        className="mb-2 text-center font-semibold"
        style={{ fontSize: 11, color: "#6b7080" }}
      >
        {answeredCount} of {totalCount} answered
      </Text>
      <Pressable
        onPress={onSubmit}
        style={[styles.button, !allAnswered && { opacity: 0.7 }]}
        className="items-center rounded-2xl py-4"
      >
        <Text className="text-[16px] font-extrabold text-white">
          {allAnswered
            ? "Submit Test ✓"
            : `Submit (${totalCount - answeredCount} unanswered)`}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#121318",
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.04)",
  },
  button: {
    backgroundColor: "#00bc7d",
    shadowColor: "rgba(0,188,125,0.2)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 4,
  },
});
