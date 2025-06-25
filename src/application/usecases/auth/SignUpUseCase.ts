import { AccountRepository } from '@infra/database/dynamo/repositories/AccountRepository';
import { AuthGateway } from '@infra/gateways/AuthGateway';
import { Injectable } from '@kernel/decorators/Injectable';
import { Account } from 'src/entities/Account';

@Injectable()
export class SignUpUseCase {
  constructor(
    private readonly authGateway: AuthGateway,
    private readonly accountRepository: AccountRepository,
  ) { }

  async execute({
    email,
    password,
  }: SignUpUseCase.Input): Promise<SignUpUseCase.Output> {
    const emailAlreadyInUse = await this.accountRepository.findEmail(email);

    if (emailAlreadyInUse) {
      throw new Error('This email already in use');
    }

    const { externalId } = await this.authGateway.signUp({ email, password });

    const account = new Account({ externalId, email });
    await this.accountRepository.create(account);

    const { accessToken, refreshToken } = await this.authGateway.signIn({
      email,
      password,
    });

    return {
      accessToken,
      refreshToken,
    };
  }
}

export namespace SignUpUseCase {
  export type Input = {
    email: string;
    password: string;
  }

  export type Output = {
    accessToken: string;
    refreshToken: string;
  }
}
