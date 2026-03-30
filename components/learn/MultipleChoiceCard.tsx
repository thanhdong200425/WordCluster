import { QuestionTypeBadge } from "@/components/learn/QuestionTypeBadge";
import { Text } from "@/components/ui/text";
import { useAppTheme } from "@/constants/appTheme";
import type { Question } from "@/types/learn";
import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";

interface MultipleChoiceCardProps {
  question: Question;
  onAnswer: (correct: boolean) => void;
}

type AnswerState = {
  selected: number;
  correct: boolean;
} | null;

export function MultipleChoiceCard({
  question,
  onAnswer,
}: MultipleChoiceCardProps) {
  const theme = useAppTheme();
  const [answerState, setAnswerState] = useState<AnswerState>(null);
  const options = question.options ?? [];

  const handleSelect = (index: number) => {
    if (answerState) return;

    const isCorrect = options[index] === question.answer;
    setAnswerState({ selected: index, correct: isCorrect });

    setTimeout(() => onAnswer(isCorrect), 800);
  };

  const getOptionStyle = (index: number) => {
    if (!answerState)
      return {
        backgroundColor: theme.surface2,
        borderColor: theme.border,
      };

    const isSelected = answerState.selected === index;
    const isCorrectOption = options[index] === question.answer;

    if (isCorrectOption)
      return {
        backgroundColor: "rgba(0,188,125,0.12)",
        borderColor: "#00bc7d",
      };
    if (isSelected && !answerState.correct)
      return {
        backgroundColor: "rgba(255,107,138,0.12)",
        borderColor: "#ff6b8a",
      };
    return {
      backgroundColor: theme.surface,
      borderColor: theme.border,
      opacity: 0.5,
    };
  };

  const getOptionTextColor = (index: number) => {
    if (!answerState) return theme.text;

    const isSelected = answerState.selected === index;
    const isCorrectOption = options[index] === question.answer;

    if (isCorrectOption) return "#00bc7d";
    if (isSelected && !answerState.correct) return "#ff6b8a";
    return theme.textMuted;
  };

  const getBadgeIcon = (index: number) => {
    if (!answerState) return String(index + 1);

    const isSelected = answerState.selected === index;
    const isCorrectOption = options[index] === question.answer;

    if (isCorrectOption) return "✓";
    if (isSelected && !answerState.correct) return "✗";
    return String(index + 1);
  };

  return (
    <View className="px-5">
      <QuestionTypeBadge type={question.type} round={question.round} />

      <Text
        className="mb-1 font-bold uppercase"
        style={{ fontSize: 10, letterSpacing: 1.5, color: theme.textFaint }}
      >
        {question.promptLabel}
      </Text>

      <Text
        className="mb-2 text-lg font-semibold"
        style={{ color: theme.text }}
      >
        {question.prompt}
      </Text>

      {question.item.type ? (
        <View
          className="mb-4 self-start rounded-lg px-2.5 py-1"
          style={{ backgroundColor: "rgba(173,70,255,0.12)" }}
        >
          <Text className="text-[11px] font-bold uppercase text-[#ad46ff]">
            {question.item.type}
          </Text>
        </View>
      ) : (
        <View className="mb-4" />
      )}

      <View className="gap-2.5">
        {options.map((option, index) => (
          <Pressable
            key={option}
            onPress={() => handleSelect(index)}
            disabled={!!answerState}
            style={[styles.optionBase, getOptionStyle(index)]}
            className="flex-row items-center rounded-2xl px-4 py-3.5"
          >
            <View
              className="mr-3 items-center justify-center rounded-lg"
              style={[
                styles.badge,
                {
                  backgroundColor:
                    answerState && options[index] === question.answer
                      ? "rgba(0,188,125,0.2)"
                      : answerState &&
                          answerState.selected === index &&
                          !answerState.correct
                        ? "rgba(255,107,138,0.2)"
                        : theme.border,
                },
              ]}
            >
              <Text
                className="text-[13px] font-bold"
                style={{ color: getOptionTextColor(index) }}
              >
                {getBadgeIcon(index)}
              </Text>
            </View>
            <Text
              className="flex-1 text-[15px] font-medium"
              style={{ color: getOptionTextColor(index) }}
            >
              {option}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  optionBase: {
    borderWidth: 1.5,
  },
  badge: {
    width: 26,
    height: 26,
  },
});
