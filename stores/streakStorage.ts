import { StreakStorage } from "@/types/streak";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const asyncStorageAdapter = {
  getItem: async (name: string) => {
    try {
      return await AsyncStorage.getItem(name);
    } catch (error) {
      console.error("Failed to get streak item from AsyncStorage:", error);
      return null;
    }
  },
  setItem: async (name: string, value: string) => {
    try {
      await AsyncStorage.setItem(name, value);
      return true;
    } catch (error) {
      console.error("Failed to set streak item in AsyncStorage:", error);
      return false;
    }
  },
  removeItem: async (name: string) => {
    try {
      await AsyncStorage.removeItem(name);
      return true;
    } catch (error) {
      console.error("Failed to remove streak item from AsyncStorage:", error);
      return false;
    }
  },
};

function getToday(): string {
  return new Date().toISOString().split("T")[0];
}

function calculateStreak(dates: string[], fromDate: string): number {
  if (dates.length === 0) return 0;

  const sorted = [...new Set(dates)].sort().reverse();
  if (sorted[0] !== fromDate) {
    const yesterday = new Date(fromDate);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split("T")[0];
    if (sorted[0] !== yesterdayStr) return 0;
  }

  let streak = 0;
  let current = new Date(sorted[0]);

  for (const dateStr of sorted) {
    const expected = current.toISOString().split("T")[0];
    if (dateStr === expected) {
      streak++;
      current.setDate(current.getDate() - 1);
    } else if (dateStr < expected) {
      break;
    }
  }

  return streak;
}

function calculateBestStreak(dates: string[]): number {
  if (dates.length === 0) return 0;

  const unique = [...new Set(dates)].sort();
  let best = 1;
  let current = 1;

  for (let i = 1; i < unique.length; i++) {
    const prev = new Date(unique[i - 1]);
    const curr = new Date(unique[i]);
    const diffDays = Math.round(
      (curr.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24),
    );

    if (diffDays === 1) {
      current++;
      best = Math.max(best, current);
    } else {
      current = 1;
    }
  }

  return best;
}

function getWeekDates(): string[] {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const monday = new Date(today);
  monday.setDate(today.getDate() - ((dayOfWeek + 6) % 7));

  const week: string[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    week.push(d.toISOString().split("T")[0]);
  }
  return week;
}

const useStreakStorage = create<StreakStorage>()(
  persist(
    (set, get) => ({
      studyDates: [],

      recordStudySession: () => {
        const today = getToday();
        const dates = get().studyDates;
        if (!dates.includes(today)) {
          set({ studyDates: [...dates, today] });
        }
      },

      getCurrentStreak: () => {
        return calculateStreak(get().studyDates, getToday());
      },

      getBestStreak: () => {
        return calculateBestStreak(get().studyDates);
      },

      getWeekActivity: () => {
        const dates = new Set(get().studyDates);
        return getWeekDates().map((d) => dates.has(d));
      },
    }),
    {
      name: "streak-storage",
      storage: createJSONStorage(() => asyncStorageAdapter),
      partialize: (state) => ({
        studyDates: state.studyDates,
      }),
    },
  ),
);

export default useStreakStorage;
