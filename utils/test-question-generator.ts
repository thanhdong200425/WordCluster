import type { QuestionItem } from "@/types/learn";
import type { TestConfig, TestQuestion, TestQuestionType } from "@/types/test";
import {
  generateMCOptions,
  pickRandom,
  shuffle,
  termAppearsInExample,
} from "@/utils/question-helpers";

const ALL_WORD_TYPES = [
  "noun",
  "verb",
  "adjective",
  "adverb",
  "pronoun",
  "preposition",
];

export function getAvailableTypes(
  items: QuestionItem[],
): Record<TestQuestionType, boolean> {
  const hasExampleWithTerm = items.some(
    (i) => i.example && termAppearsInExample(i.term, i.example),
  );
  const hasType = items.some((i) => !!i.type);
  const exampleCount = items.filter((i) => !!i.example).length;

  return {
    multiple_choice: items.length >= 1,
    true_false: items.length >= 1,
    written: items.length >= 1,
    fill_blank: hasExampleWithTerm,
    word_type: hasType,
    example_match: exampleCount >= 3,
  };
}

function generateMC(items: QuestionItem[], id: number): TestQuestion[] {
  const allDefinitions = items.map((i) => i.definition);
  return shuffle(items).map((item, idx) => ({
    id: id + idx,
    type: "multiple_choice" as const,
    sectionLabel: "Multiple Choice",
    prompt: `What is the definition of "${item.term}"?`,
    answer: item.definition,
    options: generateMCOptions(item.definition, allDefinitions),
    item,
  }));
}

function generateTF(
  items: QuestionItem[],
  id: number,
): TestQuestion[] {
  const allDefinitions = items.map((i) => i.definition);
  return shuffle(items).map((item, idx) => {
    const isTrue = Math.random() > 0.5;
    if (isTrue) {
      return {
        id: id + idx,
        type: "true_false" as const,
        sectionLabel: "True / False",
        prompt: `"${item.term}" means: ${item.definition}`,
        answer: "True",
        options: ["True", "False"],
        item,
      };
    }
    const wrongDefs = allDefinitions.filter((d) => d !== item.definition);
    const wrongDef =
      wrongDefs.length > 0
        ? wrongDefs[Math.floor(Math.random() * wrongDefs.length)]
        : item.definition;
    return {
      id: id + idx,
      type: "true_false" as const,
      sectionLabel: "True / False",
      prompt: `"${item.term}" means: ${wrongDef}`,
      answer: wrongDef === item.definition ? "True" : "False",
      options: ["True", "False"],
      correctExplanation: item.definition,
      item,
    };
  });
}

function generateWritten(
  items: QuestionItem[],
  id: number,
): TestQuestion[] {
  return shuffle(items).map((item, idx) => ({
    id: id + idx,
    type: "written" as const,
    sectionLabel: "Written",
    prompt: item.definition,
    answer: item.term.toLowerCase(),
    item,
  }));
}

function generateFillBlank(
  items: QuestionItem[],
  id: number,
): TestQuestion[] {
  const eligible = items.filter(
    (i) => i.example && termAppearsInExample(i.term, i.example),
  );
  return shuffle(eligible).map((item, idx) => {
    const escaped = item.term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const prompt = item.example!.replace(new RegExp(escaped, "i"), "______");
    return {
      id: id + idx,
      type: "fill_blank" as const,
      sectionLabel: "Fill in the Blank",
      prompt,
      answer: item.term.toLowerCase(),
      item,
    };
  });
}

function generateWordType(
  items: QuestionItem[],
  id: number,
): TestQuestion[] {
  const eligible = items.filter((i) => !!i.type);
  return shuffle(eligible).map((item, idx) => {
    const otherTypes = ALL_WORD_TYPES.filter(
      (t) => t.toLowerCase() !== item.type!.toLowerCase(),
    );
    const distractors = pickRandom(otherTypes, 3);
    return {
      id: id + idx,
      type: "word_type" as const,
      sectionLabel: "Word Type",
      prompt: `What part of speech is "${item.term}"?`,
      hint: item.definition,
      answer: item.type!,
      options: shuffle([item.type!, ...distractors]),
      item,
    };
  });
}

function generateExampleMatch(
  items: QuestionItem[],
  id: number,
): TestQuestion[] {
  const withExamples = items.filter((i) => !!i.example);
  if (withExamples.length < 3) return [];

  return shuffle(withExamples).map((item, idx) => {
    const otherExamples = withExamples
      .filter((i) => i !== item)
      .map((i) => i.example!);
    const distractors = pickRandom(
      otherExamples,
      Math.min(3, otherExamples.length),
    );
    return {
      id: id + idx,
      type: "example_match" as const,
      sectionLabel: "Example Match",
      prompt: `Which example sentence correctly uses "${item.term}"?`,
      hint: item.definition,
      answer: item.example!,
      options: shuffle([item.example!, ...distractors]),
      item,
    };
  });
}

export function generateTestQuestions(
  items: QuestionItem[],
  config: TestConfig,
): TestQuestion[] {
  if (items.length === 0) return [];

  const questions: TestQuestion[] = [];
  let nextId = 1;

  if (config.multipleChoice) {
    const qs = generateMC(items, nextId);
    questions.push(...qs);
    nextId += qs.length;
  }

  if (config.trueFalse) {
    const qs = generateTF(items, nextId);
    questions.push(...qs);
    nextId += qs.length;
  }

  if (config.written) {
    const qs = generateWritten(items, nextId);
    questions.push(...qs);
    nextId += qs.length;
  }

  if (config.fillBlank) {
    const qs = generateFillBlank(items, nextId);
    questions.push(...qs);
    nextId += qs.length;
  }

  if (config.wordType) {
    const qs = generateWordType(items, nextId);
    questions.push(...qs);
    nextId += qs.length;
  }

  if (config.exampleMatch) {
    const qs = generateExampleMatch(items, nextId);
    questions.push(...qs);
    nextId += qs.length;
  }

  return questions;
}
