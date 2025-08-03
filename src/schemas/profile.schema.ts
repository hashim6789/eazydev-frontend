import { z } from "zod";

export const verifyPasswordSchema = z.object({
  currentPassword: z
    .string()
    .min(8, "Current password must be at least 8 characters"),
});

export const changePasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, "New password must be at least 8 characters"),
    confirmPassword: z
      .string()
      .min(8, "Confirm password must be at least 8 characters"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type VerifyPasswordFormData = z.infer<typeof verifyPasswordSchema>;
export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;
