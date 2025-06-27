import { z } from 'zod';

export const forgotPasswordSchema = z.object({
  email: z.string().min(1, '"email" is required').email('Invalid Email'),
});

export type ForgotPasswordBody = z.infer<typeof forgotPasswordSchema>
