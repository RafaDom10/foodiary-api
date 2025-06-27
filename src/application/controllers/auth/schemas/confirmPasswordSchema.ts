import { z } from 'zod';

export const confirmPasswordSchema = z.object({
  email: z.string().min(1, '"email" is required').email('Invalid Email'),
  password: z.string().min(8, '"password" should be at least 8 characters long'),
  confirmationCode: z.string().min(1, '"confirmationCode" is required'),
});

export type ConfirmPasswordBody = z.infer<typeof confirmPasswordSchema>
