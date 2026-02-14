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
      isError: false,
      createSet: async (data: CreateSetFormData) => {
        try {
          set({ isLoading: true });
          const currentSet = get().storedSets;
          const now = new Date().toISOString();
          const newSet: StoredSet = {
            ...data,
            id: generateId(),
            createdAt: now,
            updatedAt: now,
          };
          currentSet.push(newSet);
          set({ storedSets: currentSet });
          return Promise.resolve(newSet);
        } catch (error) {
          console.error("Failed to create set:", error);
          set({ isError: true });
          return Promise.reject(error ?? "Failed to create set");
        }
      },
      getSet: (id: string) => {
        return get().storedSets.find((set) => set.id === id);
      },
      updateSet: (id: string, data: Partial<CreateSetFormData>) => {
        try {
          set({ isLoading: true });
          let updatedSet: StoredSet | undefined;
          const updated = get().storedSets.map((set) => {
            if (set.id === id) {
              updatedSet = {
                ...set,
                ...data,
                updatedAt: new Date().toISOString(),
              };
              return updatedSet;
            }
            return set;
          });
          if (!updatedSet) return Promise.resolve(undefined);
          set({ storedSets: updated });
          return Promise.resolve(updatedSet);
        } catch (error) {
          console.error("Failed to update set:", error);
          set({ isError: true });
          return Promise.reject(error ?? "Set not found");
        }
      },
      deleteSet: async (id: string) => {
        try {
          set({ isLoading: true });
          const currentSet = get().storedSets;
          const filteredSet = currentSet.find((set) => set.id === id);
          if (!filteredSet) return Promise.resolve(false);
          set({ storedSets: currentSet.filter((set) => set.id !== id) });
          return Promise.resolve(true);
        } catch (error) {
          console.error("Failed to delete set:", error);
          set({ isError: true });
          return Promise.reject(error ?? "Failed to delete set");
        }
      },
    }),
    {
      name: "sets-storage",
      storage: createJSONStorage(() => asyncStorageAdapter),
      partialize: (state) => ({
        storedSets: state.storedSets,
      }),
      onRehydrateStorage: () => {
        return (state, error) => {
          if (error) {
            console.error("Failed to rehydrate sets storage:", error);
            useSetsStorage.setState({ isError: true });
          } else {
            useSetsStorage.setState({ isError: false });
            useSetsStorage.setState({ isLoading: false });
          }
        };
      },
    },
  ),
);

export default useSetsStorage;
