import type { ZodSchema } from "zod";

export const parseJsonWithSchema = <T>(schema: ZodSchema<T>, jsonString: string): T | null => {
    try {
        const parsed = JSON.parse(jsonString);
        const result = schema.safeParse(parsed);
        return result.success ? result.data : null;
    } catch (_error) {
        return null;
    }
};
