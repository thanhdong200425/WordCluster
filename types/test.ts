import type { QuestionItem } from "@/types/learn";

export type TestQuestionType =
  | "multiple_choice"
  | "true_false"
  | "written"
  | "fill_blank"
  | "word_type"
  | "example_match";

export interface TestQuestion {
  id: number;
  type: TestQuestionType;
  sectionLabel: string;
  prompt: string;
  hint?: string;
  answer: string;
  options?: string[];
  correctExplanation?: string;
  item: QuestionItem;
}

export interface TestConfig {
  multipleChoice: boolean;
  trueFalse: boolean;
  written: boolean;
  fillBlank: boolean;
  wordType: boolean;
  exampleMatch: boolean;
  timer: number; // 0 = no timer, else minutes
}

export interface GradedResult extends TestQuestion {
  userAnswer: string;
  correct: boolean;
}

export const DEFAULT_TEST_CONFIG: TestConfig = {
  multipleChoice: true,
  trueFalse: true,
  written: true,
  fillBlank: true,
  wordType: true,
  exampleMatch: true,
  timer: 0,
};

export const TEST_QUESTION_META: Record<
  TestQuestionType,
  { icon: string; label: string; description: string; enhanced: boolean }
> = {
  multiple_choice: {
    icon: "radio-button-on-outline",
    label: "Multiple Choice",
    description: "Pick the right definition",
    enhanced: false,
  },
  true_false: {
    icon: "checkmark-done-outline",
    label: "True / False",
    description: "Judge if the match is correct",
    enhanced: false,
  },
  written: {
    icon: "create-outline",
    label: "Written",
    description: "Type the term from definition",
    enhanced: false,
  },
  fill_blank: {
    icon: "text-outline",
    label: "Fill in the Blank",
    description: "Complete the example sentence",
    enhanced: true,
  },
  word_type: {
    icon: "pricetag-outline",
    label: "Word Type",
    description: "Identify the part of speech",
    enhanced: true,
  },
  example_match: {
    icon: "chatbubble-outline",
    label: "Example Match",
    description: "Match word to its example",
    enhanced: true,
  },
};
