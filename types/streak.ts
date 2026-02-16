export type StreakStorageState = {
  studyDates: string[];
};

export type StreakStorageActions = {
  recordStudySession: () => void;
  getCurrentStreak: () => number;
  getBestStreak: () => number;
  getWeekActivity: () => boolean[];
};

export type StreakStorage = StreakStorageState & StreakStorageActions;
