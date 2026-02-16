import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface UserStorage {
  userName: string;
  setUserName: (name: string) => void;
}

const asyncStorageAdapter = {
  getItem: async (name: string) => {
    try {
      return await AsyncStorage.getItem(name);
    } catch (error) {
      console.error("Failed to get user item from AsyncStorage:", error);
      return null;
    }
  },
  setItem: async (name: string, value: string) => {
    try {
      await AsyncStorage.setItem(name, value);
      return true;
    } catch (error) {
      console.error("Failed to set user item in AsyncStorage:", error);
      return false;
    }
  },
  removeItem: async (name: string) => {
    try {
      await AsyncStorage.removeItem(name);
      return true;
    } catch (error) {
      console.error("Failed to remove user item from AsyncStorage:", error);
      return false;
    }
  },
};

const useUserStorage = create<UserStorage>()(
  persist(
    (set) => ({
      userName: "Dong",

      setUserName: (name: string) => {
        set({ userName: name.trim() || "Dong" });
      },
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => asyncStorageAdapter),
      partialize: (state) => ({
        userName: state.userName,
      }),
    },
  ),
);

export default useUserStorage;
