import { Text } from "@/components/ui/text";
import { useAppTheme } from "@/constants/appTheme";
import { StyleSheet, View } from "react-native";

interface SectionHeaderProps {
  label: string;
  questionCount: number;
}

export function SectionHeader({ label, questionCount }: SectionHeaderProps) {
  const theme = useAppTheme();
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.bg,
          borderBottomColor: theme.border,
        },
      ]}
      className="flex-row items-center px-5 py-2.5"
    >
      <Text
        className="font-extrabold uppercase"
        style={{ fontSize: 11, letterSpacing: 1, color: theme.accentStart }}
      >
        {label}
      </Text>
      <Text className="ml-2" style={{ fontSize: 10, color: theme.textFaint }}>
        · {questionCount} {questionCount === 1 ? "question" : "questions"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
  },
});
