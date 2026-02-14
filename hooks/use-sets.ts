import { CreateSetFormData } from "@/schemas/create-set-schema";
import { StoredSet } from "@/types/set";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "word-cluster:sets";

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

async function loadSets(): Promise<StoredSet[]> {
  const json = await AsyncStorage.getItem(STORAGE_KEY);
  return json ? JSON.parse(json) : [];
}

async function saveSets(sets: StoredSet[]): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(sets));
}

export function useSets() {
  const [sets, setSets] = useState<StoredSet[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const refreshSets = useCallback(async () => {
    try {
      const data = await loadSets();
      setSets(data);
    } catch (error) {
      console.error("Failed to load sets:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshSets();
  }, [refreshSets]);

  const createSet = useCallback(
    async (data: CreateSetFormData): Promise<StoredSet> => {
      const now = new Date().toISOString();
      const newSet: StoredSet = {
        ...data,
        id: generateId(),
        createdAt: now,
        updatedAt: now,
      };
      const updated = [...(await loadSets()), newSet];
      await saveSets(updated);
      setSets(updated);
      return newSet;
    },
    [],
  );

  const getSet = useCallback(
    (id: string): StoredSet | undefined => {
      return sets.find((s) => s.id === id);
    },
    [sets],
  );

  const updateSet = useCallback(
    async (
      id: string,
      data: Partial<CreateSetFormData>,
    ): Promise<StoredSet | undefined> => {
      const current = await loadSets();
      const index = current.findIndex((s) => s.id === id);
      if (index === -1) return undefined;

      const updatedSet: StoredSet = {
        ...current[index],
        ...data,
        updatedAt: new Date().toISOString(),
      };
      current[index] = updatedSet;
      await saveSets(current);
      setSets(current);
      return updatedSet;
    },
    [],
  );

  const deleteSet = useCallback(async (id: string): Promise<boolean> => {
    const current = await loadSets();
    const filtered = current.filter((s) => s.id !== id);
    if (filtered.length === current.length) return false;

    await saveSets(filtered);
    setSets(filtered);
    return true;
  }, []);

  return {
    sets,
    isLoading,
    createSet,
    getSet,
    updateSet,
    deleteSet,
    refreshSets,
  };
}
