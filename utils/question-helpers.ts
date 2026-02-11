export function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function pickRandom<T>(array: T[], count: number, exclude?: T): T[] {
  const filtered =
    exclude !== undefined ? array.filter((x) => x !== exclude) : [...array];
  return shuffle(filtered).slice(0, count);
}

export function generateMCOptions(
  correctAnswer: string,
  allOptions: string[],
  maxOptions = 4,
): string[] {
  const distractors = pickRandom(allOptions, maxOptions - 1, correctAnswer);
  return shuffle([correctAnswer, ...distractors]);
}

export function termAppearsInExample(term: string, example: string): boolean {
  const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(escaped, "i").test(example);
}
