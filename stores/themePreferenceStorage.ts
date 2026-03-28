import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type ThemePreference = "light" | "dark" | "system";

interface ThemePreferenceStorage {
  preference: ThemePreference;
  setPreference: (pref: ThemePreference) => void;
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

const useThemePreferenceStorage = create<ThemePreferenceStorage>()(
  persist(
    (set) => ({
      preference: "system",
      setPreference: (preference) => set({ preference }),
    }),
    {
      name: "theme-preference-storage",
      storage: createJSONStorage(() => asyncStorageAdapter),
    },
  ),
);

export default useThemePreferenceStorage;
