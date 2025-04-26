import { z } from "zod";

export const registerUserFormSchema = z
  .object({
    email: z.string().email(),
    userName: z.string(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterUserFormSchemaType = z.infer<typeof registerUserFormSchema>;

export const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type LoginFormSchemaType = z.infer<typeof loginFormSchema>;
