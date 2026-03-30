import { Text } from "@/components/ui/text";
import { useAppTheme } from "@/constants/appTheme";
import type { GradedResult } from "@/types/test";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { LayoutAnimation, Pressable, StyleSheet, View } from "react-native";

interface ReviewItemProps {
  result: GradedResult;
  questionNumber: number;
}

export function ReviewItem({ result, questionNumber }: ReviewItemProps) {
  const theme = useAppTheme();
  const [expanded, setExpanded] = useState(false);

  const toggle = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded((prev) => !prev);
  };

  return (
    <Pressable
      onPress={toggle}
      style={[
        styles.container,
        result.correct
          ? {
              backgroundColor: "rgba(0,188,125,0.04)",
              borderColor: "rgba(0,188,125,0.12)",
            }
          : {
              backgroundColor: "rgba(255,107,138,0.04)",
              borderColor: "rgba(255,107,138,0.12)",
            },
      ]}
      className="mx-5 mb-2.5 rounded-xl px-4 py-3"
    >
      {/* Collapsed row */}
      <View className="flex-row items-center">
        <Ionicons
          name={result.correct ? "checkmark-circle" : "close-circle"}
          size={20}
          color={result.correct ? "#00bc7d" : "#ff6b8a"}
        />
        <Text
          className="ml-2 flex-1 font-semibold"
          style={{ fontSize: 14, color: theme.text }}
        >
          Q{questionNumber}. {result.item.term}
        </Text>
        <Text
          className="mr-2 font-bold uppercase"
          style={{ fontSize: 10, color: theme.accentStart }}
        >
          {result.sectionLabel}
        </Text>
        <Ionicons
          name={expanded ? "chevron-up" : "chevron-down"}
          size={16}
          color={theme.textMuted}
        />
      </View>

      {/* Expanded details */}
      {expanded && (
        <View className="mt-3" style={[styles.divider, { borderTopColor: theme.border }]}>
          <Text className="mb-3 mt-3" style={{ fontSize: 12, color: theme.textMuted }}>
            {result.prompt}
          </Text>

          {/* User's answer */}
          <View
            style={[
              styles.answerBox,
              result.correct
                ? {
                    backgroundColor: "rgba(0,188,125,0.06)",
                    borderColor: "rgba(0,188,125,0.15)",
                  }
                : {
                    backgroundColor: "rgba(255,107,138,0.06)",
                    borderColor: "rgba(255,107,138,0.15)",
                  },
            ]}
            className="mb-2 rounded-lg px-3 py-2.5"
          >
            <Text
              className="font-bold uppercase"
              style={{
                fontSize: 9,
                letterSpacing: 0.8,
                color: result.correct ? "#00bc7d" : "#ff6b8a",
              }}
            >
              YOUR ANSWER
            </Text>
            <Text
              className="mt-1 font-medium"
              style={{
                fontSize: 13,
                color: result.userAnswer ? theme.text : theme.textMuted,
              }}
            >
              {result.userAnswer || "(no answer)"}
            </Text>
          </View>

          {/* Correct answer (only if wrong) */}
          {!result.correct && (
            <View
              style={[
                styles.correctBox,
                {
                  backgroundColor: `${theme.accentStart}15`,
                  borderColor: `${theme.accentStart}25`,
                },
              ]}
              className="rounded-lg px-3 py-2.5"
            >
              <Text
                className="font-bold uppercase"
                style={{ fontSize: 9, letterSpacing: 0.8, color: theme.accentStart }}
              >
                CORRECT ANSWER
              </Text>
              <Text
                className="mt-1 font-medium"
                style={{ fontSize: 13, color: theme.text }}
              >
                {result.correctExplanation ?? result.answer}
              </Text>
            </View>
          )}
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1.5,
  },
  divider: {
    borderTopWidth: 1,
  },
  answerBox: {
    borderWidth: 1,
  },
  correctBox: {
    borderWidth: 1,
  },
});
