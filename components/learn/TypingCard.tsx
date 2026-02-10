import { CorrectAnswerBox } from "@/components/learn/CorrectAnswerBox";
import { QuestionTypeBadge } from "@/components/learn/QuestionTypeBadge";
import { Text } from "@/components/ui/text";
import type { Question } from "@/types/learn";
import { useEffect, useRef, useState } from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";

interface TypingCardProps {
  question: Question;
  onAnswer: (correct: boolean) => void;
}

type CheckState = "idle" | "correct" | "wrong";

export function TypingCard({ question, onAnswer }: TypingCardProps) {
  const [input, setInput] = useState("");
  const [checkState, setCheckState] = useState<CheckState>("idle");
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 100);
  }, []);

  const handleCheck = () => {
    if (!input.trim() || checkState !== "idle") return;

    const isCorrect = input.trim().toLowerCase() === question.answer;
    setCheckState(isCorrect ? "correct" : "wrong");

    setTimeout(() => onAnswer(isCorrect), 1000);
  };

  const inputStyle =
    checkState === "correct"
      ? styles.inputCorrect
      : checkState === "wrong"
        ? styles.inputWrong
        : styles.inputDefault;

  return (
    <View className="px-5">
      <QuestionTypeBadge type={question.type} round={question.round} />

      <Text
        className="mb-1 font-bold uppercase"
        style={{ fontSize: 10, letterSpacing: 1.5, color: "rgba(255,255,255,0.3)" }}
      >
        {question.promptLabel}
      </Text>

      <Text className="mb-6 text-lg font-semibold text-[#e8eaf0]">
        {question.prompt}
      </Text>

      <TextInput
        ref={inputRef}
        value={input}
        onChangeText={setInput}
        onSubmitEditing={handleCheck}
        placeholder="Type your answer..."
        placeholderTextColor="#4a4d5e"
        editable={checkState === "idle"}
        autoCapitalize="none"
        autoCorrect={false}
        style={[styles.inputBase, inputStyle]}
      />

      {checkState === "wrong" && (
        <CorrectAnswerBox term={question.item.term} />
      )}

      <Pressable
        onPress={handleCheck}
        disabled={!input.trim() || checkState !== "idle"}
        className="mt-4 items-center rounded-xl py-4"
        style={[
          styles.checkButton,
          { opacity: !input.trim() || checkState !== "idle" ? 0.4 : 1 },
        ]}
      >
        <Text className="text-[15px] font-bold text-white">Check</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  inputBase: {
    borderWidth: 2,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 18,
    fontSize: 17,
    fontWeight: "500",
    color: "#e8eaf0",
  },
  inputDefault: {
    backgroundColor: "rgba(255,255,255,0.04)",
    borderColor: "rgba(255,255,255,0.1)",
  },
  inputCorrect: {
    backgroundColor: "rgba(0,188,125,0.08)",
    borderColor: "#00bc7d",
  },
  inputWrong: {
    backgroundColor: "rgba(255,107,138,0.08)",
    borderColor: "#ff6b8a",
  },
  checkButton: {
    backgroundColor: "#5b6cff",
    shadowColor: "rgba(91,108,255,0.25)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 4,
  },
});
