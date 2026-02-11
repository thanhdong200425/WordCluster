import { TestConfigScreen } from "@/components/test/TestConfigScreen";
import { TestExamScreen } from "@/components/test/TestExamScreen";
import { TestResultsScreen } from "@/components/test/TestResultsScreen";
import type { QuestionItem } from "@/types/learn";
import type { GradedResult, TestConfig, TestQuestion } from "@/types/test";
import { gradeTest } from "@/utils/test-grader";
import { generateTestQuestions } from "@/utils/test-question-generator";
import { useCallback, useState } from "react";

interface TestScreenProps {
  items: QuestionItem[];
  onBack: () => void;
}

type TestPhase =
  | { phase: "config" }
  | { phase: "exam"; questions: TestQuestion[]; config: TestConfig }
  | { phase: "results"; gradedResults: GradedResult[]; config: TestConfig };

export function TestScreen({ items, onBack }: TestScreenProps) {
  const [state, setState] = useState<TestPhase>({ phase: "config" });

  const handleStart = useCallback(
    (config: TestConfig) => {
      const questions = generateTestQuestions(items, config);
      setState({ phase: "exam", questions, config });
    },
    [items],
  );

  const handleSubmit = useCallback(
    (answers: Record<number, string>) => {
      if (state.phase !== "exam") return;
      const gradedResults = gradeTest(state.questions, answers);
      setState({ phase: "results", gradedResults, config: state.config });
    },
    [state],
  );

  const handleRetake = useCallback(() => {
    setState({ phase: "config" });
  }, []);

  switch (state.phase) {
    case "config":
      return (
        <TestConfigScreen items={items} onStart={handleStart} onBack={onBack} />
      );
    case "exam":
      return (
        <TestExamScreen
          questions={state.questions}
          config={state.config}
          onSubmit={handleSubmit}
          onCancel={onBack}
        />
      );
    case "results":
      return (
        <TestResultsScreen
          gradedResults={state.gradedResults}
          onRetake={handleRetake}
          onBack={onBack}
        />
      );
  }
}
