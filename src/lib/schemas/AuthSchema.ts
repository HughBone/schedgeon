import { z } from "zod";
import { type SuperValidated, type Infer } from "sveltekit-superforms";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(30),
});

export const registerSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8).max(30),
    confirmPassword: z.string(),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["confirmPassword"],
      });
    }
  });

export type LoginSchema = Infer<typeof loginSchema>;
export type RegisterSchema = Infer<typeof registerSchema>;
