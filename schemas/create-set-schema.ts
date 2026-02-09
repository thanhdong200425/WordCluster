import { z } from "zod/v4";

export const createSetSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string(),
  items: z
    .array(
      z.object({
        term: z.string().min(1, "Term is required"),
        definition: z.string().min(1, "Definition is required"),
        example: z.string().optional(),
        type: z.string().optional(),
      }),
    )
    .min(1, "At least 1 terms are required"),
});

export type CreateSetFormData = z.infer<typeof createSetSchema>;
