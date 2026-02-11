import { MCQuestionCard } from "@/components/test/MCQuestionCard";
import { SectionHeader } from "@/components/test/SectionHeader";
import { SubmitBar } from "@/components/test/SubmitBar";
import { SubmitConfirmModal } from "@/components/test/SubmitConfirmModal";
import { TFQuestionCard } from "@/components/test/TFQuestionCard";
import { TestStickyHeader } from "@/components/test/TestStickyHeader";
import { WrittenQuestionCard } from "@/components/test/WrittenQuestionCard";
import type { TestConfig, TestQuestion } from "@/types/test";
import { useCallback, useMemo, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SectionList,
  View,
} from "react-native";

interface TestExamScreenProps {
  questions: TestQuestion[];
  config: TestConfig;
  onSubmit: (answers: Record<number, string>) => void;
  onCancel: () => void;
}

interface Section {
  title: string;
  data: TestQuestion[];
}

export function TestExamScreen({
  questions,
  config,
  onSubmit,
  onCancel,
}: TestExamScreenProps) {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showConfirm, setShowConfirm] = useState(false);

  const sections = useMemo<Section[]>(() => {
    const map = new Map<string, TestQuestion[]>();
    for (const q of questions) {
      const existing = map.get(q.sectionLabel);
      if (existing) {
        existing.push(q);
      } else {
        map.set(q.sectionLabel, [q]);
      }
    }
    return Array.from(map.entries()).map(([title, data]) => ({
      title,
      data,
    }));
  }, [questions]);

  const answeredCount = Object.keys(answers).filter(
    (k) => answers[Number(k)]?.length > 0,
  ).length;

  const unansweredCount = questions.length - answeredCount;

  const handleChange = useCallback(
    (questionId: number, value: string) => {
      setAnswers((prev) => ({ ...prev, [questionId]: value }));
    },
    [],
  );

  const handleSubmitPress = () => {
    if (unansweredCount > 0) {
      setShowConfirm(true);
    } else {
      onSubmit(answers);
    }
  };

  const handleTimeUp = useCallback(() => {
    onSubmit(answers);
  }, [answers, onSubmit]);

  const renderItem = useCallback(
    ({ item }: { item: TestQuestion }) => {
      switch (item.type) {
        case "multiple_choice":
        case "word_type":
        case "example_match":
          return (
            <MCQuestionCard
              question={item}
              answer={answers[item.id]}
              onChange={handleChange}
              questionNumber={item.id}
            />
          );
        case "true_false":
          return (
            <TFQuestionCard
              question={item}
              answer={answers[item.id]}
              onChange={handleChange}
              questionNumber={item.id}
            />
          );
        case "written":
        case "fill_blank":
          return (
            <WrittenQuestionCard
              question={item}
              answer={answers[item.id] ?? ""}
              onChange={handleChange}
              questionNumber={item.id}
            />
          );
        default:
          return null;
      }
    },
    [answers, handleChange],
  );

  const renderSectionHeader = useCallback(
    ({ section }: { section: Section }) => (
      <SectionHeader label={section.title} questionCount={section.data.length} />
    ),
    [],
  );

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-[#121318]"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TestStickyHeader
        answered={answeredCount}
        total={questions.length}
        timerMinutes={config.timer}
        onTimeUp={handleTimeUp}
        onCancel={onCancel}
      />

      <SectionList
        sections={sections}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        stickySectionHeadersEnabled
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: 120 }}
        ItemSeparatorComponent={() => (
          <View
            className="mx-5 my-1"
            style={{
              height: 1,
              backgroundColor: "rgba(255,255,255,0.04)",
            }}
          />
        )}
      />

      <SubmitBar
        answeredCount={answeredCount}
        totalCount={questions.length}
        onSubmit={handleSubmitPress}
      />

      <SubmitConfirmModal
        visible={showConfirm}
        unansweredCount={unansweredCount}
        onConfirm={() => {
          setShowConfirm(false);
          onSubmit(answers);
        }}
        onCancel={() => setShowConfirm(false)}
      />
    </KeyboardAvoidingView>
  );
}
