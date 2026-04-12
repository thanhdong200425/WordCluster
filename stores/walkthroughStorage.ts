import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type WalkthroughKey = "home" | "setDetail" | "learn" | "flashcard";

interface WalkthroughStorage {
  hasSeenHome: boolean;
  hasSeenSetDetail: boolean;
  hasSeenLearn: boolean;
  hasSeenFlashcard: boolean;
  markSeen: (key: WalkthroughKey) => void;
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
    } catch {}
  },
  removeItem: async (name: string) => {
    try {
      await AsyncStorage.removeItem(name);
    } catch {}
  },
};

const useWalkthroughStorage = create<WalkthroughStorage>()(
  persist(
    (set) => ({
      hasSeenHome: false,
      hasSeenSetDetail: false,
      hasSeenLearn: false,
      hasSeenFlashcard: false,
      markSeen: (key) => {
        switch (key) {
          case "home":
            set({ hasSeenHome: true });
            break;
          case "setDetail":
            set({ hasSeenSetDetail: true });
            break;
          case "learn":
            set({ hasSeenLearn: true });
            break;
          case "flashcard":
            set({ hasSeenFlashcard: true });
            break;
        }
      },
    }),
    {
      name: "walkthrough-storage",
      storage: createJSONStorage(() => asyncStorageAdapter),
    },
  ),
);

export default useWalkthroughStorage;
