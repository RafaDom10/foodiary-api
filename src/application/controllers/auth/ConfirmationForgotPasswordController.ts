import { Controller } from '@application/contracts/Controller';
import { BadRequest } from '@application/errors/http/BadRequest';
import { ConfirmForgotPasswordUseCase } from '@application/usecases/auth/ConfirmForgotPasswordUseCase';
import { Injectable } from '@kernel/decorators/Injectable';
import { Schema } from '@kernel/decorators/schema';
import { ConfirmPasswordBody, confirmPasswordSchema } from './schemas/confirmPasswordSchema';

@Injectable()
@Schema(confirmPasswordSchema)
export class ConfirmationForgotPasswordController extends Controller<'public', ConfirmationForgotPasswordController.Response> {
  constructor(private readonly confirmationPasswordUseCase: ConfirmForgotPasswordUseCase) {
    super();
  }

  protected override async handle({ body }: Controller.Request<'public', ConfirmPasswordBody>):
    Promise<Controller.Response<ConfirmationForgotPasswordController.Response>> {
    try {
      const { email, password, confirmationCode } = body;

      await this.confirmationPasswordUseCase.execute({
        email,
        password,
        confirmationCode,
      });

      return {
        statusCode: 204,
      };
    } catch {
      throw new BadRequest('Failed. Try again.');
    }
  }
}

export namespace ConfirmationForgotPasswordController {
  export type Response = null
}
