import { z } from "zod";

const envSchema = z.object({
  VITE_BACKEND_API_URL: z.string().url(),
  VITE_ENV_MODE: z
    .enum(["development", "production", "staging"])
    .default("development"),
});

const parsedEnv = envSchema.safeParse(import.meta.env);

if (!parsedEnv.success) {
  console.error("❌ Invalid environment variables:", parsedEnv.error.format());

  throw new Error("Invalid environment variables.");
}

export const env = parsedEnv.data;
