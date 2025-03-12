import { z } from "zod";

export interface CreateMaterialFormData {
  title: string;
  description: string;
  type: "reading" | "video";
  duration: number;
  fileKey: string;
  mentorId: string;
}

// Zod schema for validation
export const materialSchema = z.object({
  type: z.enum(["reading", "video"], {
    required_error: "Material type is required",
  }),
  title: z
    .string()
    .min(5, { message: "Title must be at least 5 characters" })
    .max(50, { message: "Title must be at most 50 characters" })
    .regex(/^[a-zA-Z0-9\s]+$/, {
      message: "Title must be alphanumeric only",
    }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters" })
    .max(300, { message: "Description must be at most 300 characters" }),
  duration: z
    .number()
    .min(2, { message: "Duration must be at least 2 minutes" })
    .max(50, { message: "Duration cannot exceed 50 minutes" }),
  fileKey: z
    .string()
    .min(5, { message: "file key must be at least 5 characters" }),

  mentorId: z.string(),
});

export type MaterialFormValues = z.infer<typeof materialSchema>;
