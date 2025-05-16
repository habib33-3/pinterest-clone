import { z } from "zod";

export const likePinSchema = z.object({
    params: z.object({
        pinId: z.string().uuid(),
    }),
});

export type LikePinType = z.infer<typeof likePinSchema>["params"];

export const getPinsLikeCountSchema = z.object({
    params: z.object({
        pinId: z.string().uuid(),
    }),
});

export type GetPinsLikeCountType = z.infer<typeof getPinsLikeCountSchema>["params"];
