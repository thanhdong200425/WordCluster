import { ExampleMatchCard } from "@/components/learn/ExampleMatchCard";
import { FeedbackOverlay } from "@/components/learn/FeedbackOverlay";
import { FillBlankCard } from "@/components/learn/FillBlankCard";
import { LearnResultsScreen } from "@/components/learn/LearnResultsScreen";
import { MultipleChoiceCard } from "@/components/learn/MultipleChoiceCard";
import { ProgressHeader } from "@/components/learn/ProgressHeader";
import { TypeMatchCard } from "@/components/learn/TypeMatchCard";
import { TypingCard } from "@/components/learn/TypingCard";
import { HiddenCopilotStepNumber } from "@/components/walkthrough/HiddenCopilotStepNumber";
import { WalkthroughController } from "@/components/walkthrough/WalkthroughController";
import { WalkthroughTooltip } from "@/components/walkthrough/WalkthroughTooltip";
import { useAppTheme } from "@/constants/appTheme";
import type { Question, QuestionItem } from "@/types/learn";
import { generateQuestions } from "@/utils/question-generator";
import { useCallback, useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { CopilotProvider, CopilotStep, walkthroughable } from "react-native-copilot";

const WalkthroughView = walkthroughable(View);

interface LearnScreenProps {
  items: QuestionItem[];
  onBack: () => void;
}

export function LearnScreen({ items, onBack }: LearnScreenProps) {
  return (
    <CopilotProvider
      tooltipComponent={WalkthroughTooltip}
      stepNumberComponent={HiddenCopilotStepNumber}
    >
      <LearnScreenContent items={items} onBack={onBack} />
    </CopilotProvider>
  );
}

function LearnScreenContent({ items, onBack }: LearnScreenProps) {
  const theme = useAppTheme();
  const [questions] = useState<Question[]>(() => generateQuestions(items));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [results, setResults] = useState<boolean[]>([]);
  const [streak, setStreak] = useState(0);
  const [feedbackCorrect, setFeedbackCorrect] = useState<boolean | null>(null);
  const [isComplete, setIsComplete] = useState(false);

  const handleAnswer = useCallback(
    (correct: boolean) => {
      setResults((prev) => [...prev, correct]);
      setFeedbackCorrect(correct);

      if (correct) {
        setStreak((prev) => prev + 1);
      } else {
        setStreak(0);
      }

      setTimeout(() => {
        setFeedbackCorrect(null);
        if (currentIndex >= questions.length - 1) {
          setIsComplete(true);
        } else {
          setCurrentIndex((prev) => prev + 1);
        }
      }, 1200);
    },
    [currentIndex, questions.length]
  );

  const handleRestart = () => {
    setCurrentIndex(0);
    setResults([]);
    setStreak(0);
    setFeedbackCorrect(null);
    setIsComplete(false);
  };

  if (isComplete) {
    return (
      <LearnResultsScreen
        results={results}
        totalQuestions={questions.length}
        onRestart={handleRestart}
        onBack={onBack}
      />
    );
  }

  const question = questions[currentIndex];

  const renderQuestionCard = () => {
    switch (question.type) {
      case "multiple_choice":
        return (
          <MultipleChoiceCard
            key={currentIndex}
            question={question}
            onAnswer={handleAnswer}
          />
        );
      case "typing":
        return (
          <TypingCard
            key={currentIndex}
            question={question}
            onAnswer={handleAnswer}
          />
        );
      case "fill_blank":
        return (
          <FillBlankCard
            key={currentIndex}
            question={question}
            onAnswer={handleAnswer}
          />
        );
      case "type_match":
        return (
          <TypeMatchCard
            key={currentIndex}
            question={question}
            onAnswer={handleAnswer}
          />
        );
      case "example_match":
        return (
          <ExampleMatchCard
            key={currentIndex}
            question={question}
            onAnswer={handleAnswer}
          />
        );
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1"
      style={{ backgroundColor: theme.bg }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <WalkthroughController walkthroughKey="learn" />

      <CopilotStep
        text="Track your progress and answer streak here"
        order={1}
        name="learn-progress-header"
      >
        <WalkthroughView>
          <ProgressHeader
            current={currentIndex + 1}
            total={questions.length}
            streak={streak}
            onClose={onBack}
          />
        </WalkthroughView>
      </CopilotStep>

      
      <ScrollView
        className="flex-1"
        contentContainerClassName="pb-20 pt-4"
        keyboardShouldPersistTaps="handled"
      >
        {renderQuestionCard()}
      </ScrollView>

      <FeedbackOverlay correct={feedbackCorrect} />
    </KeyboardAvoidingView>
  );
}
