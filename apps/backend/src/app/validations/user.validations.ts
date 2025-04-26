import { z } from "zod";

export const registerUserSchema = z.object({
    body: z.object({
        userName: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
    }),
});

export type RegisterUserType = z.infer<typeof registerUserSchema>["body"];

export const loginUserSchema = z.object({
    body: z.object({
        email: z.string(),
        password: z.string(),
    }),
});

export type LoginUserType = z.infer<typeof loginUserSchema>["body"];

export const followUserSchema = z.object({
    body: z.object({
        followingId: z.string().uuid(),
    }),
});

export type FollowUserType = z.infer<typeof followUserSchema>["body"];
