import { z } from "zod";
import { PROJECT_COLORS } from "@/constants/projectConstants";


export const projectFormSchema = z.object({
  name: z.string().min(1, { message: "Name must be at least 1 character." }),
  description: z.string().optional(),
  status: z.enum(["not_started", "in_progress", "postponed", "cancelled", "completed"]),
  color: z.enum(PROJECT_COLORS, { errorMap: () => ({ message: "Invalid color selected." }) }),
});
