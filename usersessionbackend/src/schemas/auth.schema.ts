import { z } from 'zod';

export const authSchema = z.object({
  name: z.string()
    .min(3, { message: "Username must be at least 3 characters long." })
    .max(20, { message: "Username cannot exceed 20 characters." })
    .regex(/^[a-zA-Z0-9_]+$/, { message: "Username can only contain letters, numbers, and underscores." }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
});

export const authSchemasignin = z.object({
  email: z.string().email({ message: 'Invalid email format' }),
  password: z.string().min(1, { message: 'Password is required' })
});

export type AuthSchema = z.infer<typeof authSchema>;
export type AuthSchemaSignin = z.infer<typeof authSchemasignin>;

