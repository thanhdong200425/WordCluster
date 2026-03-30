import { QuestionTypeBadge } from "@/components/learn/QuestionTypeBadge";
import { Text } from "@/components/ui/text";
import { useAppTheme } from "@/constants/appTheme";
import type { Question } from "@/types/learn";
import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";

interface TypeMatchCardProps {
  question: Question;
  onAnswer: (correct: boolean) => void;
}

type AnswerState = {
  selected: number;
  correct: boolean;
} | null;

export function TypeMatchCard({ question, onAnswer }: TypeMatchCardProps) {
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

      <Text className="mb-5 text-[13px]" style={{ color: theme.textMuted }}>
        {question.item.definition}
      </Text>

      <View className="gap-2.5">
        {options.map((option, index) => (
          <Pressable
            key={option}
            onPress={() => handleSelect(index)}
            disabled={!!answerState}
            style={[styles.optionBase, getOptionStyle(index)]}
            className="items-center rounded-2xl px-4 py-3.5"
          >
            <Text
              className="text-[15px] font-semibold capitalize"
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
});
