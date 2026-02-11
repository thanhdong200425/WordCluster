import { Text } from "@/components/ui/text";
import type { TestQuestion } from "@/types/test";
import { StyleSheet, TextInput, View } from "react-native";

interface WrittenQuestionCardProps {
  question: TestQuestion;
  answer: string;
  onChange: (questionId: number, value: string) => void;
  questionNumber: number;
}

export function WrittenQuestionCard({
  question,
  answer,
  onChange,
  questionNumber,
}: WrittenQuestionCardProps) {
  const isFillBlank = question.type === "fill_blank";
  const hasText = answer.length > 0;

  return (
    <View className="px-5 py-3">
      {/* Header row */}
      <View className="mb-2 flex-row items-center gap-2">
        <Text
          className="font-bold"
          style={{ fontSize: 10, fontFamily: "monospace", color: "#4a4d5e" }}
        >
          Q{questionNumber}
        </Text>
        {!hasText && (
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
      {isFillBlank ? (
        <View className="mb-3">
          <Text
            className="font-medium text-[#e8eaf0]"
            style={{ fontSize: 14, lineHeight: 22 }}
          >
            {renderFillBlankPrompt(question.prompt)}
          </Text>
        </View>
      ) : (
        <Text
          className="mb-3 font-medium text-[#e8eaf0]"
          style={{ fontSize: 14, lineHeight: 22 }}
        >
          {question.prompt}
        </Text>
      )}

      {/* Text Input */}
      <TextInput
        value={answer}
        onChangeText={(text) => onChange(question.id, text)}
        placeholder="Type your answer..."
        placeholderTextColor="#4a4d5e"
        autoCapitalize="none"
        autoCorrect={false}
        style={[
          styles.input,
          hasText ? styles.inputActive : styles.inputDefault,
        ]}
      />
    </View>
  );
}

function renderFillBlankPrompt(prompt: string) {
  const parts = prompt.split("______");
  if (parts.length < 2) return prompt;

  return (
    <Text
      className="font-medium text-[#e8eaf0]"
      style={{ fontSize: 14, lineHeight: 22 }}
    >
      {parts[0]}
      <Text
        className="font-bold text-[#00bc7d]"
        style={{ textDecorationLine: "underline" }}
      >
        {"______"}
      </Text>
      {parts[1]}
    </Text>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 2,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 14,
    fontWeight: "500",
    color: "#e8eaf0",
    fontFamily: "monospace",
  },
  inputDefault: {
    backgroundColor: "rgba(255,255,255,0.04)",
    borderColor: "rgba(255,255,255,0.08)",
  },
  inputActive: {
    backgroundColor: "rgba(255,255,255,0.04)",
    borderColor: "rgba(0,188,125,0.2)",
  },
});
