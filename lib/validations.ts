import { z } from "zod";

export const questionSchema = z.object({
    title: z.string().min(5).max(130),
    explanation: z.string().min(10).max(200),
    tags: z.array(z.string().min(1).max(15)).min(1).max(3),
});
