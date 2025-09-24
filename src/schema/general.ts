import z from "zod";

export const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  age: z
    .string()
    .min(1, "Age is required")
    .regex(/^\d+$/, "Age must be a number")
    .refine((v) => Number(v) >= 1 && Number(v) <= 120, {
      message: "Age must be between 1 and 120",
    }),
  email: z.string().email("Enter a valid email"),
  rt1: z
    .string()
    .min(1, "Required")
    .regex(/^\d+$/, "Numbers only")
    .refine((v) => Number(v) > 0, { message: "Must be > 0" }),
  rt2: z
    .string()
    .min(1, "Required")
    .regex(/^\d+$/, "Numbers only")
    .refine((v) => Number(v) > 0, { message: "Must be > 0" }),
  rt3: z
    .string()
    .min(1, "Required")
    .regex(/^\d+$/, "Numbers only")
    .refine((v) => Number(v) > 0, { message: "Must be > 0" }),
});

export type FormValues = z.infer<typeof schema>;
