import type { Question, QuestionItem } from "@/types/learn";
import {
  generateMCOptions,
  pickRandom,
  shuffle,
  termAppearsInExample,
} from "@/utils/question-helpers";

function generateRound1(items: QuestionItem[], allTerms: string[]): Question[] {
  return items.map((item) => ({
    type: "multiple_choice" as const,
    prompt: item.definition,
    promptLabel: "DEFINITION",
    answer: item.term,
    options: generateMCOptions(item.term, allTerms),
    item,
    round: 1 as const,
  }));
}

const ALL_WORD_TYPES = ["noun", "verb", "adjective", "adverb"];

function generateRound2Question(
  item: QuestionItem,
  allItems: QuestionItem[]
): Question {
  const availableTypes: Array<() => Question> = [];

  // fill_blank: only if example exists and contains the term
  if (item.example && termAppearsInExample(item.term, item.example)) {
    availableTypes.push(() => {
      const escaped = item.term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const prompt = item.example!.replace(new RegExp(escaped, "i"), "______");
      return {
        type: "fill_blank" as const,
        prompt,
        promptLabel: "FILL IN THE BLANK",
        answer: item.term.toLowerCase(),
        item,
        round: 2 as const,
      };
    });
  }

  // type_match: only if item has a type
  if (item.type) {
    availableTypes.push(() => {
      const otherTypes = ALL_WORD_TYPES.filter(
        (t) => t.toLowerCase() !== item.type!.toLowerCase()
      );
      const distractors = pickRandom(otherTypes, 3);
      return {
        type: "type_match" as const,
        prompt: item.term,
        promptLabel: `WHAT TYPE OF WORD IS "${item.term.toUpperCase()}"?`,
        answer: item.type!,
        options: shuffle([item.type!, ...distractors]),
        item,
        round: 2 as const,
      };
    });
  }

  // example_match: only if item has example and ≥2 other items have examples
  const otherExamples = allItems
    .filter((i) => i !== item && i.example)
    .map((i) => i.example!);
  if (item.example && otherExamples.length >= 2) {
    availableTypes.push(() => {
      const distractors = pickRandom(otherExamples, 3);
      return {
        type: "example_match" as const,
        prompt: item.term,
        promptLabel: "WHICH EXAMPLE USES THIS WORD?",
        answer: item.example!,
        options: shuffle([item.example!, ...distractors]),
        item,
        round: 2 as const,
      };
    });
  }

  // typing: always available as fallback
  availableTypes.push(() => ({
    type: "typing" as const,
    prompt: item.definition,
    promptLabel: "TYPE THE TERM",
    answer: item.term.toLowerCase(),
    item,
    round: 2 as const,
  }));

  // Pick one randomly (but prefer non-typing if available)
  const nonTyping = availableTypes.slice(0, -1);
  const chosen =
    nonTyping.length > 0
      ? nonTyping[Math.floor(Math.random() * nonTyping.length)]
      : availableTypes[0];

  return chosen();
}

export function generateQuestions(items: QuestionItem[]): Question[] {
  if (items.length === 0) return [];

  const allTerms = items.map((i) => i.term);

  const round1 = shuffle(generateRound1(items, allTerms));
  const round2 = shuffle(items.map((item) => generateRound2Question(item, items)));

  return [...round1, ...round2];
}
