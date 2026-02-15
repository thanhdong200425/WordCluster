import { CreateSetFormData } from "@/schemas/create-set-schema";

export interface StoredSet extends CreateSetFormData {
  id: string;
  createdAt: string;
  updatedAt: string;
}

// Zustand store type
export type SetsStorageState = {
  storedSets: StoredSet[];
  searchQuery: string;
  isLoading: boolean;
  isError: boolean;
};

export type SetsStorageActions = {
  createSet: (data: CreateSetFormData) => Promise<StoredSet>;
  getSet: (id: string) => StoredSet | undefined;
  updateSet: (
    id: string,
    data: Partial<CreateSetFormData>,
  ) => Promise<StoredSet | undefined>;
  deleteSet: (id: string) => Promise<boolean>;
  setSearchQuery: (query: string) => void;
  getFilteredSets: () => StoredSet[];
};

export type SetsStorage = SetsStorageState & SetsStorageActions;
