import { z } from 'zod';

export const sessionSchema = z.object({
    date: z.string().min(1, { message: 'Date is required' }),
    techStack: z.string().min(1, { message: 'Tech stack is required' }),
    topics: z.array(z.string().min(1)).min(1, { message: 'At least one topic is required' }),
});

export type SessionSchema = z.infer<typeof sessionSchema>;