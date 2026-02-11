import { QuestionTypeToggle } from "@/components/test/QuestionTypeToggle";
import { TimerSelector } from "@/components/test/TimerSelector";
import { Text } from "@/components/ui/text";
import type { QuestionItem } from "@/types/learn";
import {
  DEFAULT_TEST_CONFIG,
  TEST_QUESTION_META,
  type TestConfig,
  type TestQuestionType,
} from "@/types/test";
import { getAvailableTypes } from "@/utils/test-question-generator";
import { Ionicons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";

interface TestConfigScreenProps {
  items: QuestionItem[];
  onStart: (config: TestConfig) => void;
  onBack: () => void;
}

const CONFIG_KEYS: Record<TestQuestionType, keyof TestConfig> = {
  multiple_choice: "multipleChoice",
  true_false: "trueFalse",
  written: "written",
  fill_blank: "fillBlank",
  word_type: "wordType",
  example_match: "exampleMatch",
};

const QUESTION_TYPES: TestQuestionType[] = [
  "multiple_choice",
  "true_false",
  "written",
  "fill_blank",
  "word_type",
  "example_match",
];

export function TestConfigScreen({
  items,
  onStart,
  onBack,
}: TestConfigScreenProps) {
  const available = useMemo(() => getAvailableTypes(items), [items]);

  const [config, setConfig] = useState<TestConfig>(() => ({
    ...DEFAULT_TEST_CONFIG,
    fillBlank: available.fill_blank,
    wordType: available.word_type,
    exampleMatch: available.example_match,
  }));

  const toggleType = (type: TestQuestionType) => {
    const key = CONFIG_KEYS[type];
    setConfig((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const totalQuestions = useMemo(() => {
    let count = 0;
    for (const type of QUESTION_TYPES) {
      const key = CONFIG_KEYS[type];
      if (config[key] && available[type]) {
        if (type === "fill_blank") {
          count += items.filter(
            (i) =>
              i.example &&
              new RegExp(
                i.term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
                "i",
              ).test(i.example),
          ).length;
        } else if (type === "word_type") {
          count += items.filter((i) => !!i.type).length;
        } else if (type === "example_match") {
          count += items.filter((i) => !!i.example).length;
        } else {
          count += items.length;
        }
      }
    }
    return count;
  }, [config, items, available]);

  const hasEnabledTypes = QUESTION_TYPES.some((type) => {
    const key = CONFIG_KEYS[type];
    return config[key] && available[type];
  });

  return (
    <View className="flex-1 bg-[#121318]">
      <ScrollView
        className="flex-1"
        contentContainerClassName="pb-32"
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="flex-row items-center px-5 pb-2 pt-2">
          <Pressable onPress={onBack} className="w-10">
            <Ionicons name="chevron-back" size={24} color="#e8eaf0" />
          </Pressable>
        </View>

        <View className="mb-6 items-center px-5">
          <Text style={{ fontSize: 32 }}>{"📋"}</Text>
          <Text
            className="mt-2 font-extrabold text-[#e8eaf0]"
            style={{ fontSize: 20 }}
          >
            Test Settings
          </Text>
          <Text className="mt-1" style={{ fontSize: 13, color: "#6b7080" }}>
            {items.length} terms · {totalQuestions} questions
          </Text>
        </View>

        {/* Question Types Section */}
        <Text
          className="mb-3 px-5 font-extrabold uppercase"
          style={{
            fontSize: 10,
            letterSpacing: 1.5,
            color: "rgba(255,255,255,0.25)",
          }}
        >
          QUESTION TYPES
        </Text>

        {QUESTION_TYPES.map((type) => {
          const meta = TEST_QUESTION_META[type];
          const key = CONFIG_KEYS[type];
          return (
            <QuestionTypeToggle
              key={type}
              icon={meta.icon}
              label={meta.label}
              description={meta.description}
              enhanced={meta.enhanced}
              enabled={config[key] as boolean}
              available={available[type]}
              onToggle={() => toggleType(type)}
            />
          );
        })}

        {/* Timer Section */}
        <Text
          className="mb-3 mt-4 px-5 font-extrabold uppercase"
          style={{
            fontSize: 10,
            letterSpacing: 1.5,
            color: "rgba(255,255,255,0.25)",
          }}
        >
          TIMER (OPTIONAL)
        </Text>

        <TimerSelector
          value={config.timer}
          onChange={(minutes) => setConfig((prev) => ({ ...prev, timer: minutes }))}
        />
      </ScrollView>

      {/* Start Button */}
      <View className="absolute bottom-0 left-0 right-0 px-5 pb-6 pt-4"
        style={styles.bottomGradient}
      >
        <Pressable
          onPress={() => hasEnabledTypes && onStart(config)}
          disabled={!hasEnabledTypes}
          style={[
            styles.startButton,
            !hasEnabledTypes && { opacity: 0.4 },
          ]}
          className="items-center rounded-2xl py-4"
        >
          <Text className="text-[16px] font-extrabold text-white">
            Start Test{totalQuestions > 0 ? ` (${totalQuestions})` : ""}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomGradient: {
    backgroundColor: "#121318",
  },
  startButton: {
    backgroundColor: "#00bc7d",
    shadowColor: "rgba(0,188,125,0.3)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 4,
  },
});
