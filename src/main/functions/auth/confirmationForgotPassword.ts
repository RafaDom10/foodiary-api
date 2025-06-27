import 'reflect-metadata';

import { ConfirmationForgotPasswordController } from '@application/controllers/auth/ConfirmationForgotPasswordController';
import { Registry } from '@kernel/di/Registry';
import { lambdaHttpAdapter } from '@main/adapters/lambdaHttpAdapter';

const controller = Registry.getInstance().resolve(ConfirmationForgotPasswordController);

export const handler = lambdaHttpAdapter(controller);
