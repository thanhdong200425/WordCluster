import { Text } from "@/components/ui/text";
import { useAppTheme } from "@/constants/appTheme";
import type { TestQuestion } from "@/types/test";
import { Pressable, StyleSheet, View } from "react-native";

interface MCQuestionCardProps {
  question: TestQuestion;
  answer: string | undefined;
  onChange: (questionId: number, value: string) => void;
  questionNumber: number;
}

export function MCQuestionCard({
  question,
  answer,
  onChange,
  questionNumber,
}: MCQuestionCardProps) {
  const theme = useAppTheme();
  const options = question.options ?? [];

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
        className="mb-1 font-medium"
        style={{ fontSize: 14, lineHeight: 22, color: theme.text }}
      >
        {question.prompt}
      </Text>

      {/* Hint */}
      {question.hint && (
        <Text className="mb-2 italic" style={{ fontSize: 11, color: theme.textMuted }}>
          Hint: {question.hint}
        </Text>
      )}

      {/* Options */}
      <View className="mt-2 gap-2">
        {options.map((option) => {
          const isSelected = answer === option;
          return (
            <Pressable
              key={option}
              onPress={() => onChange(question.id, option)}
              style={[
                styles.optionBase,
                isSelected
                  ? {
                      backgroundColor: "rgba(0,188,125,0.08)",
                      borderColor: "rgba(0,188,125,0.3)",
                    }
                  : {
                      backgroundColor: theme.surface2,
                      borderColor: theme.border,
                    },
              ]}
              className="flex-row items-center rounded-xl px-4 py-3"
            >
              {/* Radio circle */}
              <View
                style={[
                  styles.radio,
                  isSelected
                    ? { borderColor: "#00bc7d" }
                    : { borderColor: theme.border },
                ]}
              >
                {isSelected && <View style={styles.radioInner} />}
              </View>
              <Text
                className="flex-1 font-medium"
                style={{
                  fontSize: 13,
                  color: isSelected ? theme.text : theme.textMuted,
                }}
              >
                {option}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  optionBase: {
    borderWidth: 1.5,
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    marginRight: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#00bc7d",
  },
});
