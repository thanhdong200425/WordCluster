import type { GradedResult, TestQuestion } from "@/types/test";

export function gradeTest(
  questions: TestQuestion[],
  answers: Record<number, string>,
): GradedResult[] {
  return questions.map((question) => {
    const userAnswer = answers[question.id] ?? "";

    let correct: boolean;
    if (question.type === "written" || question.type === "fill_blank") {
      correct =
        userAnswer.trim().toLowerCase() === question.answer.toLowerCase();
    } else {
      correct = userAnswer === question.answer;
    }

    return { ...question, userAnswer, correct };
  });
}
