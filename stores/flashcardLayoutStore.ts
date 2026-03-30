import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const CANONICAL_FIELDS = [
  "term",
  "definition",
  "example",
  "type",
] as const;
export type FieldId = (typeof CANONICAL_FIELDS)[number];
export type Face = "front" | "back";

export const FIELD_LABEL: Record<FieldId, string> = {
  term: "Term",
  definition: "Definition",
  example: "Example",
  type: "Type",
};

interface FlashcardLayoutState {
  frontFields: FieldId[];
  backFields: FieldId[];
}

interface FlashcardLayoutActions {
  toggleField: (face: Face, field: FieldId) => void;
  swapFaces: () => void;
  isFieldEnabled: (face: Face, field: FieldId) => boolean;
  getEnabledFields: (face: Face) => FieldId[];
}

type FlashcardLayoutStore = FlashcardLayoutState & FlashcardLayoutActions;

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

const useFlashcardLayoutStore = create<FlashcardLayoutStore>()(
  persist(
    (set, get) => ({
      frontFields: ["term"],
      backFields: ["definition"],

      toggleField: (face, field) => {
        const key = face === "front" ? "frontFields" : "backFields";
        const current = get()[key];
        const isEnabled = current.includes(field);

        // Don't allow disabling the last field
        if (isEnabled && current.length === 1) return;

        // When adding, maintain canonical order
        const updated = isEnabled
          ? current.filter((f) => f !== field)
          : CANONICAL_FIELDS.filter((f) => f === field || current.includes(f));

        set({ [key]: updated });
      },

      swapFaces: () => {
        const { frontFields, backFields } = get();
        set({ frontFields: backFields, backFields: frontFields });
      },

      isFieldEnabled: (face, field) => {
        const fields =
          face === "front" ? get().frontFields : get().backFields;
        return fields.includes(field);
      },

      getEnabledFields: (face) =>
        face === "front" ? [...get().frontFields] : [...get().backFields],
    }),
    {
      name: "flashcard-layout-storage",
      storage: createJSONStorage(() => asyncStorageAdapter),
      partialize: (state) => ({
        frontFields: state.frontFields,
        backFields: state.backFields,
      }),
    },
  ),
);

export default useFlashcardLayoutStore;
