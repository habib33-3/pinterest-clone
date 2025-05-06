import { z } from "zod";

export const createPinFormSchema = z
  .object({
    title: z.string(),
    description: z.string().optional(),
    link: z.string().optional(),
    board: z.string().optional(),
    newBoardTitle: z.string().optional(),
    tags: z.array(z.string()).optional(),
  })
  .superRefine((data, ctx) => {
    if (!data.board && !data.newBoardTitle) {
      ctx.addIssue({
        path: ["board"],
        code: z.ZodIssueCode.custom,
        message: "New Board Title or Board Id is required",
      });
    }

    if (data.board === "new-board") {
      if (!data.newBoardTitle || data.newBoardTitle.trim() === "") {
        ctx.addIssue({
          path: ["newBoardTitle"],
          code: z.ZodIssueCode.custom,
          message: "Board name is required when creating a new board",
        });
      }
    }
  });

export type CreatePinFormSchemaType = z.infer<typeof createPinFormSchema>;
