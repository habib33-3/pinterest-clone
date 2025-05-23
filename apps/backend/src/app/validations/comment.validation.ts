import { z } from "zod";

export const postCommentSchema = z.object({
    body: z.object({
        comment: z.string(),
        pinId: z.string().uuid(),
    }),
});

export type PostCommentType = z.infer<typeof postCommentSchema>["body"];

export const updateCommentSchema = z.object({
    body: z.object({
        comment: z.string(),
    }),
});

export type UpdateCommentType = z.infer<typeof updateCommentSchema>["body"];
