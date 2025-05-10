import { z } from "zod";

export const postCommentSchema = z.object({
    body: z.object({
        comment: z.string(),
        pinId: z.string().uuid(),
    }),
});

export type PostCommentType = z.infer<typeof postCommentSchema>["body"];
