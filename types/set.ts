import { CreateSetFormData } from "@/schemas/create-set-schema";

export interface StoredSet extends CreateSetFormData {
  id: string;
  createdAt: string;
  updatedAt: string;
}
