import { z } from "zod";

export const articleIdSchema = z.object({
  id: z
    .string()
    .refine((val) => Number.isInteger(Number(val)) && Number(val) > 0, {
      message: "Invalid article ID",
    }),
});