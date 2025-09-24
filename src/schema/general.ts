import { z } from "zod";

export const schema = z.object({
  name: z.string().min(1, "Name must be at least 1 character"),
  age: z.number().positive("Age is required"),
  email: z.string().email("Enter a valid email"),
  rt1: z.number().positive("Required"),
  rt2: z.number().positive("Required"),
  rt3: z.number().positive("Required"),
});

export type FormValues = z.infer<typeof schema>;
