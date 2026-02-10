export type QuestionType =
  | "multiple_choice"
  | "typing"
  | "fill_blank"
  | "type_match"
  | "example_match";

export interface QuestionItem {
  term: string;
  definition: string;
  example?: string;
  type?: string;
}

export interface Question {
  type: QuestionType;
  prompt: string;
  promptLabel: string;
  answer: string;
  options?: string[];
  item: QuestionItem;
  round: 1 | 2;
}

export const QUESTION_TYPE_META: Record<
  QuestionType,
  { icon: string; label: string; color: string }
> = {
  multiple_choice: { icon: "🔘", label: "Multiple Choice", color: "#5b6cff" },
  typing: { icon: "⌨️", label: "Type Answer", color: "#fb923c" },
  fill_blank: { icon: "📝", label: "Fill the Blank", color: "#00bc7d" },
  type_match: { icon: "🏷️", label: "Word Type", color: "#ad46ff" },
  example_match: { icon: "💬", label: "Match Example", color: "#ff6b8a" },
};
