import { AuthGateway } from '@infra/gateways/AuthGateway';
import { Injectable } from '@kernel/decorators/Injectable';

@Injectable()
export class ConfirmForgotPasswordUseCase {
  constructor(
    private readonly authGateway: AuthGateway,
  ) { }

  async execute({
    email,
    password,
    confirmationCode,
  }: ConfirmForgotPasswordUseCase.Input): Promise<ConfirmForgotPasswordUseCase.Output> {
    await this.authGateway.confirmForgotPassword({
      email,
      password,
      confirmationCode,
    });
  }
}

export namespace ConfirmForgotPasswordUseCase {
  export type Input = {
    email: string;
    password: string;
    confirmationCode: string;
  }

  export type Output = void
}
