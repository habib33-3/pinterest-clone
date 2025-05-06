import { z } from "zod";

export const createPinSchema = z.object({
    body: z.object({
        title: z.string(),
        description: z.string().optional(),
        link: z.string().optional(),
        board: z.string().optional(),
        tags: z.preprocess((value) => {
            if (typeof value === "string") {
                return [value];
            }
            return value;
        }, z.array(z.string())),

        newBoardTitle: z.string().optional(),
        canvasOptions: z.string(),
        textOptions: z.string(),
        textBoxOptions: z.string(),
    }),
});

export type CreatePinType = z.infer<typeof createPinSchema>["body"];
