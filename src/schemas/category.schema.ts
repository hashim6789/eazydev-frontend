import { z } from "zod";

// Define the schema for validation
export const categorySchema = z.object({
  newTitle: z
    .string()
    .min(3, "Title must be at least 3 characters long")
    .max(100, "Title must be less than 100 characters"),
});

// Type for form data
export type CategoryFormData = z.infer<typeof categorySchema>;
