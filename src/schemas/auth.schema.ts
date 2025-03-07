import { z } from "zod";

/**-----------------------login schema---------------------------- */
// Form data types
export interface LoginFormData {
  email: string;
  password: string;
}
// Schema validation using Zod
export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
export type LoginSchema = z.infer<typeof loginSchema>;

/**-----------------------signup schema---------------------------- */

export interface SignupFormData extends LoginFormData {
  firstName: string;
  lastName?: string;
  confirmPassword: string;
}

export const signupSchema = z
  .object({
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().optional(),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    // .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    // .regex(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: z.string().min(6, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type SignupSchema = z.infer<typeof signupSchema>;

/**-----------------------forgot password schema---------------------------- */
// Form data types
export interface ForgotPasswordFormData {
  email: string;
}
// Schema validation using Zod
export const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});
export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;
