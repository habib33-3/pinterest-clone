import { z } from "zod";

export const canvasOptionsSchema = z
    .object({
        orientation: z.enum(["portrait", "landscape"]),
        size: z.object({
            width: z.number(),
            height: z.number(),
        }),
        originalSize: z.object({
            width: z.number(),
            height: z.number(),
        }),
        originalOrientation: z.enum(["portrait", "landscape"]),
        backgroundColor: z.string(),
    })
    .default({
        orientation: "portrait",
        size: { width: 375, height: 667 },
        originalSize: { width: 375, height: 667 },
        originalOrientation: "portrait",
        backgroundColor: "#ffffff",
    });

export const textOptionsSchema = z
    .object({
        fontSize: z.number(),
        alignment: z.enum(["left", "center", "right"]),
        color: z.string(),
    })
    .default({
        fontSize: 16,
        alignment: "center",
        color: "#000000",
    });

export const textBoxOptionsSchema = z
    .object({
        left: z.number(),
        top: z.number(),
        width: z.number(),
        height: z.number(),
        text: z.string(),
    })
    .default({
        left: 50,
        top: 50,
        width: 100,
        height: 30,
        text: "",
    });

export type CanvasOptionsType = z.infer<typeof canvasOptionsSchema>;
export type TextOptionsType = z.infer<typeof textOptionsSchema>;
export type TextBoxOptionsType = z.infer<typeof textBoxOptionsSchema>;

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
        newBoardDescription: z.string().optional(),
        isNewBoardPrivate: z
            .preprocess((val) => {
                if (typeof val === "string") {
                    return val === "true";
                }
                return val;
            }, z.boolean())
            .optional(),
        canvasOptions: z.string(),
        textOptions: z.string(),
        textBoxOptions: z.string(),
    }),
});

export type CreatePinType = z.infer<typeof createPinSchema>["body"];
