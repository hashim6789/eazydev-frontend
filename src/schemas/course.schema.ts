import { z } from "zod";

/**-----------------------course schema---------------------------- */

// Define Zod schema for course details form validation
export const CourseDetailsSchema = z.object({
  title: z
    .string()
    .min(5, { message: "Title must be at least 5 characters long" })
    .max(100, { message: "Title must be at most 100 characters long" }),
  price: z
    .number()
    .min(0, { message: "Price must be positive" })
    .max(10000, { message: "Price must not exceed 10,000" }),
  category: z.object({
    id: z.string().nonempty({ message: "Category is required" }),
    title: z.string().nonempty("Category is required"),
    isListed: z.boolean(),
  }),
  description: z
    .string()
    .min(20, { message: "Description must be at least 20 characters long" })
    .max(1000, { message: "Description must be at most 1000 characters long" }),
  thumbnail: z.string().url({ message: "Thumbnail must be a valid URL" }),
});

export type CourseDetailsFormSchema = z.infer<typeof CourseDetailsSchema>;

/**-----------------------lesson schema---------------------------- */

// Define the Zod schema for the lesson form
export const LessonSchema = z.object({
  title: z
    .string()
    .min(5, { message: "Title must be at least 5 characters long" }) // Enforce meaningful titles
    .max(100, { message: "Title must be at most 100 characters long" }) // Limit overly long titles
    .regex(/^[a-zA-Z0-9 ]+$/, {
      message: "Title can only contain alphanumeric characters and spaces",
    }), // Restrict special characters
  description: z
    .string()
    .min(20, { message: "Description must be at least 20 characters long" }) // Ensure detailed descriptions
    .max(1000, { message: "Description must be at most 1000 characters long" }) // Avoid verbosity
    .regex(/^[a-zA-Z0-9 .,!?]+$/, {
      message:
        "Description can only contain alphanumeric characters, spaces, and punctuation",
    }), // Restrict invalid characters
});

export type LessonFormSchema = z.infer<typeof LessonSchema>;

/**-----------------------material schema---------------------------- */

// Define the Zod schema for material form validation
export const MaterialSchema = z.object({
  title: z
    .string()
    .min(5, { message: "Title must be at least 5 characters long" }) // Minimum length for meaningful titles
    .max(100, { message: "Title must be at most 100 characters long" }), // Maximum length to avoid overly verbose titles
  description: z
    .string()
    .min(20, { message: "Description must be at least 20 characters long" }) // Ensure sufficient detail
    .max(500, { message: "Description must be at most 500 characters long" }), // Avoid overly verbose descriptions
  type: z.enum(["reading", "video"]).default("reading"), // Restrict to specific material types
  duration: z
    .number()
    .min(1, { message: "Duration must be at least 1 minute" }) // Minimum duration for valid materials
    .max(180, { message: "Duration must not exceed 180 minutes" }), // Cap maximum duration to prevent excessively long materials
  fileKey: z
    .string()
    .min(1, { message: "File key is required" }) // Ensure fileKey is not empty
    .max(255, { message: "File key must be at most 255 characters long" }), // Reasonable limit for a file key
});

export type MaterialFormSchema = z.infer<typeof MaterialSchema>;
