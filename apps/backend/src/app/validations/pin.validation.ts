import { z } from "zod";

const canvasOptions = z
    .object({
        orientation: z.enum(["landscape", "portrait"]),
        size: z.object({ width: z.number(), height: z.number() }),
        originalOrientation: z.enum(["landscape", "portrait"]),
        originalSize: z.object({ width: z.number(), height: z.number() }),
        backgroundColor: z.string(),
    })
    .optional();

const textOptions = z
    .object({
        fontSize: z.number(),
        alignment: z.enum(["left", "center", "right"]),
        color: z.string(),
    })
    .optional();

const textBoxOptions = z
    .object({
        left: z.number(),
        top: z.number(),
        width: z.number(),
        height: z.number(),
        text: z.string(),
    })
    .optional();

export type CanvasOptionsType = z.infer<typeof canvasOptions>;
export type TextOptionsType = z.infer<typeof textOptions>;
export type TextBoxOptionsType = z.infer<typeof textBoxOptions>;

export const createPinSchema = z.object({
    body: z.object({
        title: z.string(),
        description: z.string(),
        link: z.string(),
        board: z.string().uuid(),
        tags: z.array(z.string()),
        newBoard: z.string().optional(),
        canvasOptions,
        textOptions,
        textBoxOptions,
    }),
});

export type CreatePinType = z.infer<typeof createPinSchema>["body"];
