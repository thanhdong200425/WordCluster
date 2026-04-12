import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

function getToday(): string {
  return new Date().toISOString().split("T")[0];
}

const asyncStorageAdapter = {
  getItem: async (name: string) => {
    try {
      return await AsyncStorage.getItem(name);
    } catch {
      return null;
    }
  },
  setItem: async (name: string, value: string) => {
    try {
      await AsyncStorage.setItem(name, value);
      return true;
    } catch {
      return false;
    }
  },
  removeItem: async (name: string) => {
    try {
      await AsyncStorage.removeItem(name);
      return true;
    } catch {
      return false;
    }
  },
};

interface LimitsStorage {
  date: string;
  flashcardSetsToday: string[];
  learnSessionsToday: Record<string, number>;
  testSessionsToday: Record<string, number>;
  ensureFreshDay: () => void;
  recordFlashcardSet: (setId: string) => void;
  incrementLearnSession: (setId: string) => void;
  incrementTestSession: (setId: string) => void;
}

const useLimitsStorage = create<LimitsStorage>()(
  persist(
    (set, get) => ({
      date: getToday(),
      flashcardSetsToday: [],
      learnSessionsToday: {},
      testSessionsToday: {},

      ensureFreshDay: () => {
        const today = getToday();
        if (get().date !== today) {
          set({
            date: today,
            flashcardSetsToday: [],
            learnSessionsToday: {},
            testSessionsToday: {},
          });
        }
      },

      recordFlashcardSet: (setId: string) => {
        get().ensureFreshDay();
        const current = get().flashcardSetsToday;
        if (!current.includes(setId)) {
          set({ flashcardSetsToday: [...current, setId] });
        }
      },

      incrementLearnSession: (setId: string) => {
        get().ensureFreshDay();
        const sessions = get().learnSessionsToday;
        set({
          learnSessionsToday: {
            ...sessions,
            [setId]: (sessions[setId] ?? 0) + 1,
          },
        });
      },

      incrementTestSession: (setId: string) => {
        get().ensureFreshDay();
        const sessions = get().testSessionsToday;
        set({
          testSessionsToday: {
            ...sessions,
            [setId]: (sessions[setId] ?? 0) + 1,
          },
        });
      },
    }),
    {
      name: "limits-storage",
      storage: createJSONStorage(() => asyncStorageAdapter),
      partialize: (state) => ({
        date: state.date,
        flashcardSetsToday: state.flashcardSetsToday,
        learnSessionsToday: state.learnSessionsToday,
        testSessionsToday: state.testSessionsToday,
      }),
    },
  ),
);

export default useLimitsStorage;
