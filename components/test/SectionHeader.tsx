import { Text } from "@/components/ui/text";
import { StyleSheet, View } from "react-native";

interface SectionHeaderProps {
  label: string;
  questionCount: number;
}

export function SectionHeader({ label, questionCount }: SectionHeaderProps) {
  return (
    <View style={styles.container} className="flex-row items-center px-5 py-2.5">
      <Text
        className="font-extrabold uppercase"
        style={{ fontSize: 11, letterSpacing: 1, color: "#00bc7d" }}
      >
        {label}
      </Text>
      <Text className="ml-2" style={{ fontSize: 10, color: "#4a4d5e" }}>
        · {questionCount} {questionCount === 1 ? "question" : "questions"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(0,188,125,0.04)",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,188,125,0.08)",
  },
});
