import { generateId } from "@/hooks/use-sets";
import { CreateSetFormData } from "@/schemas/create-set-schema";
import { SetsStorage, StoredSet } from "@/types/set";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

// AsyncStorage adapter => Because persit of zustand requires sync while AsyncStorage is async
const asyncStorageAdapter = {
  getItem: async (name: string) => {
    try {
      return await AsyncStorage.getItem(name);
    } catch (error) {
      console.error("Failed to get item from AsyncStorage:", error);
      return null;
    }
  },

  setItem: async (name: string, value: string) => {
    try {
      await AsyncStorage.setItem(name, value);
      return true;
    } catch (error) {
      console.error("Failed to set item in AsyncStorage:", error);
      return false;
    }
  },

  removeItem: async (name: string) => {
    try {
      await AsyncStorage.removeItem(name);
      return true;
    } catch (error) {
      console.error("Failed to remove item from AsyncStorage:", error);
      return false;
    }
  },
};

const useSetsStorage = create<SetsStorage>()(
  persist(
    (set, get) => ({
      storedSets: [],
      isLoading: true,
      createSet: async (data: CreateSetFormData) => {
        try {
          const currentSet = get().storedSets;
          const now = new Date().toISOString();
          const newSet: StoredSet = {
            ...data,
            id: generateId(),
            createdAt: now,
            updatedAt: now,
          };
          currentSet.push(newSet);
          await asyncStorageAdapter.setItem(
            "sets-storage",
            JSON.stringify(currentSet),
          );
          set({ storedSets: currentSet });
          return Promise.resolve(newSet);
        } catch (error) {
          console.error("Failed to create set:", error);
          return Promise.reject(error);
        }
      },
      getSet: (id: string) => {
        return get().storedSets.find((set) => set.id === id);
      },
      updateSet: (id: string, data: Partial<CreateSetFormData>) => {
        try {
          const currentSet = get().storedSets.find((set) => set.id === id);
          if (!currentSet) return Promise.resolve(undefined);
          const updatedSet: StoredSet = {
            ...currentSet,
            ...data,
            updatedAt: new Date().toISOString(),
          };
          const updated = get().storedSets.map((set) => {
            if (set.id === id) {
              return updatedSet;
            }
            return set;
          });
          asyncStorageAdapter.setItem("sets-storage", JSON.stringify(updated));
          set({ storedSets: updated });
          return Promise.resolve(updatedSet);
        } catch (error) {
          console.error("Failed to update set:", error);
          return Promise.reject(error ?? "Set not found");
        }
      },
      deleteSet: async (id: string) => {
        try {
          const currentSet = get().storedSets;
          const filteredSet = currentSet.find((set) => set.id === id);
          if (!filteredSet) return Promise.resolve(false);

          const updatedSets = currentSet.filter((set) => set.id !== id);
          await asyncStorageAdapter.setItem(
            "sets-storage",
            JSON.stringify(updatedSets),
          );
          set({ storedSets: updatedSets });
          return Promise.resolve(true);
        } catch (error) {
          console.error("Failed to delete set:", error);
          return Promise.reject(error ?? "Failed to delete set");
        }
      },
      refreshSets: async () => {
        try {
          const data = await asyncStorageAdapter.getItem("sets-storage");
          if (!data) return Promise.reject(new Error("No sets found"));
          set({ storedSets: JSON.parse(data), isLoading: false });
        } catch (error) {
          console.error("Failed to refresh sets:", error);
          return Promise.reject(error ?? "Failed to refresh sets");
        }
      },
    }),
    {
      name: "sets-storage",
      storage: createJSONStorage(() => asyncStorageAdapter),
      partialize: (state) => ({
        storedSets: state.storedSets,
        isLoading: state.isLoading,
      }),
    },
  ),
);
