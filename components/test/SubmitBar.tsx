import { Text } from "@/components/ui/text";
import { useAppTheme } from "@/constants/appTheme";
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
  const theme = useAppTheme();
  const allAnswered = answeredCount >= totalCount;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.bg,
          borderTopColor: theme.border,
        },
      ]}
      className="px-5 pb-6 pt-3"
    >
      <Text
        className="mb-2 text-center font-semibold"
        style={{ fontSize: 11, color: theme.textMuted }}
      >
        {answeredCount} of {totalCount} answered
      </Text>
      <Pressable
        onPress={onSubmit}
        style={[
          styles.button,
          {
            backgroundColor: theme.accentStart,
            shadowColor: `${theme.accentStart}40`,
          },
          !allAnswered && { opacity: 0.7 },
        ]}
        className="items-center rounded-2xl py-4"
      >
        <Text className="text-[16px] font-extrabold text-white">
          {allAnswered
            ? "Submit Test"
            : `Submit (${totalCount - answeredCount} unanswered)`}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
  },
  button: {
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 4,
  },
});
