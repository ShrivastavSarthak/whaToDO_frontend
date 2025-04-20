import { z } from "zod";

export const HomeSchema = z.object({
  homeName: z.string().min(3, "Home name should be greater than 3"),
  homeDesc: z.string().min(10, "Home details should be"),
  homePhoto: z.string().optional(),
});
