import { Text } from "@/components/ui/text";
import { useAppTheme } from "@/constants/appTheme";
import type { TestQuestion } from "@/types/test";
import { Pressable, StyleSheet, View } from "react-native";

interface TFQuestionCardProps {
  question: TestQuestion;
  answer: string | undefined;
  onChange: (questionId: number, value: string) => void;
  questionNumber: number;
}

export function TFQuestionCard({
  question,
  answer,
  onChange,
  questionNumber,
}: TFQuestionCardProps) {
  const theme = useAppTheme();
  return (
    <View className="px-5 py-3">
      {/* Header row */}
      <View className="mb-2 flex-row items-center gap-2">
        <Text
          className="font-bold"
          style={{ fontSize: 10, fontFamily: "monospace", color: theme.textFaint }}
        >
          Q{questionNumber}
        </Text>
        {!answer && (
          <View
            className="rounded px-1.5 py-0.5"
            style={{ backgroundColor: "rgba(251,146,60,0.12)" }}
          >
            <Text style={{ fontSize: 8, fontWeight: "700", color: "#fb923c" }}>
              UNANSWERED
            </Text>
          </View>
        )}
      </View>

      {/* Prompt */}
      <Text
        className="mb-3 font-medium"
        style={{ fontSize: 14, lineHeight: 22, color: theme.text }}
      >
        {question.prompt}
      </Text>

      {/* True / False buttons */}
      <View className="flex-row gap-3">
        <Pressable
          onPress={() => onChange(question.id, "True")}
          style={[
            styles.button,
            answer === "True"
              ? {
                  backgroundColor: "rgba(0,188,125,0.08)",
                  borderColor: "rgba(0,188,125,0.25)",
                }
              : {
                  backgroundColor: theme.surface2,
                  borderColor: theme.border,
                },
          ]}
          className="flex-1 items-center rounded-xl py-3.5"
        >
          <Text
            className="text-[15px] font-bold"
            style={{ color: answer === "True" ? "#00bc7d" : theme.textMuted }}
          >
            True
          </Text>
        </Pressable>

        <Pressable
          onPress={() => onChange(question.id, "False")}
          style={[
            styles.button,
            answer === "False"
              ? {
                  backgroundColor: "rgba(255,107,138,0.08)",
                  borderColor: "rgba(255,107,138,0.25)",
                }
              : {
                  backgroundColor: theme.surface2,
                  borderColor: theme.border,
                },
          ]}
          className="flex-1 items-center rounded-xl py-3.5"
        >
          <Text
            className="text-[15px] font-bold"
            style={{ color: answer === "False" ? "#ff6b8a" : theme.textMuted }}
          >
            False
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderWidth: 2,
  },
});
