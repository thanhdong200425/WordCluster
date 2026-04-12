import { FREE_FLASHCARD_SETS_PER_DAY } from "@/constants/limits";

/**
 * True when the user would exceed the free daily distinct-set cap by opening
 * this set. Reopening a set already counted today is always free because
 * `recordFlashcardSet` deduplicates, so it won't add a new slot.
 */
export function isFlashcardDailyLimitReached(
  setId: string,
  flashcardSetsToday: string[],
): boolean {
  const alreadyOpenedThisSetToday = flashcardSetsToday.includes(setId);
  return (
    alreadyOpenedThisSetToday &&
    flashcardSetsToday.length >= FREE_FLASHCARD_SETS_PER_DAY
  );
}

export const FLASHCARD_DAILY_LIMIT_UPSELL = {
  title: "Daily flashcard limit reached",
  description: `Free users can open up to ${FREE_FLASHCARD_SETS_PER_DAY} sets in Flashcard mode per day. Go Pro for unlimited.`,
} as const;
