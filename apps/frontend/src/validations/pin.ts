import { z } from "zod";

export const createPinFormSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  link: z.string().optional(),
  board: z.string().optional(),
  newBoardTitle: z.string().optional(),
  tags: z.array(z.string()).optional(),
  // createNewBoard:z.boolean().default(false)
});

export type CreatePinFormSchemaType = z.infer<typeof createPinFormSchema>;
