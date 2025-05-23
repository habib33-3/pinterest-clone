import { z } from "zod";

export const postCommentsInputSchema = z.object({
  comment: z.string().min(1),
});

export type PostCommentsInputType = z.infer<typeof postCommentsInputSchema>;

export const updateCommentInputSchema = z.object({
  commentText: z.string().min(1),
});

export type UpdateCommentInputType = z.infer<typeof updateCommentInputSchema>;
