import { z } from "zod";

export const TaskSchema = z.object({
  taskName: z.string().min(3, "Task length should be greater than 3"),
  taskDetails: z.string().min(10, "Task details should be"),
  created_by: z.string().min(1, "Creator is required"),
  updated_by: z.string().min(1, "Creator is required"),
  started_at: z.date(),
  point: z.string(),
  media: z.any().optional(),
});
