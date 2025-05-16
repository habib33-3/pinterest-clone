import { z } from "zod";

export const followUserSchema = z.object({
    body: z.object({
        followingUsername: z.string(),
        followerUsername: z.string(),
    }),
});

export type FollowUserType = z.infer<typeof followUserSchema>["body"];
