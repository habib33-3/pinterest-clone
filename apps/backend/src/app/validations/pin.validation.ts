import { z } from "zod";

export const createPinSchema = z.object({
    body: z.object({
        title: z.string(),
        description: z.string(),
        link: z.string(),
        board: z.string(),
        tags: z.array(z.string()),
        newBoard: z.string().optional(),
        canvasOptions: z.string().optional(),
        textOptions: z.string().optional(),
    }),
});

export type CreatePinType = z.infer<typeof createPinSchema>["body"];
