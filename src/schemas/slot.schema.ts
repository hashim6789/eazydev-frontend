import { z } from "zod";

export const timeSchema = z
  .string()
  .nonempty("Time is required")
  .refine(
    (time) => {
      const [, minutes] = time.split(":").map(Number);
      return minutes === 0;
    },
    { message: "Time must follow the hourly pattern (e.g., 11:00, 12:00)." }
  )
  .superRefine((time, ctx) => {
    const now = new Date();
    const selectedTime = new Date();
    const [hours, minutes] = time.split(":").map(Number);

    selectedTime.setHours(hours, minutes, 0, 0);

    if (selectedTime <= now) {
      ctx.addIssue({
        code: "custom",
        message: "Time must be in the future.",
      });
    }
  });

export const slotSchema = z.object({
  time: timeSchema,
});

export type SlotFormData = z.infer<typeof slotSchema>;
