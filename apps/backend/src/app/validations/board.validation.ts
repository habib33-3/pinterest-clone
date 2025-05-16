import { z } from "zod";

export const removePinFromBoardSchema = z.object({
    body: z.object({
        pinId: z.string().uuid(),
        boardId: z.string().uuid(),
    }),
});

export type RemovePinFromBoardType = z.infer<typeof removePinFromBoardSchema>["body"];
