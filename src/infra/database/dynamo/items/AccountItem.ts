import { Account } from 'src/entities/Account';

export class AccountItem {
  private readonly type = 'Account';
  private readonly keys: AccountItem.Keys;

  constructor(private readonly attr: AccountItem.Attributes) {
    this.keys = {
      PK: AccountItem.getPK(this.attr.id),
      SK: AccountItem.getSK(this.attr.id),
      GSI1PK: AccountItem.getGSI1PK(this.attr.email),
      GSI1SK: AccountItem.getGSI1SK(this.attr.email),
    };
  }

  toItem(): AccountItem.ItemType {
    return {
      ...this.keys,
      ...this.attr,
      type: this.type,
    };
  }

  static fromEntity(account: Account) {
    return new AccountItem({
      ...account,
      createdAt: account.createdAt.toISOString(),
    });
  }

  static toEntity(accountItem: AccountItem.ItemType) {
    return new Account({
      id: accountItem.id,
      createdAt: new Date(accountItem.createdAt),
      email: accountItem.email,
      externalId: accountItem.externalId,
    });
  }

  static getPK(accountId: string): AccountItem.Keys['PK'] {
    return `ACCOUNT#${accountId}`;
  }

  static getSK(accountId: string): AccountItem.Keys['SK'] {
    return `ACCOUNT#${accountId}`;
  }

  static getGSI1PK(accountId: string): AccountItem.Keys['GSI1PK'] {
    return `ACCOUNT#${accountId}`;
  }

  static getGSI1SK(accountId: string): AccountItem.Keys['GSI1SK'] {
    return `ACCOUNT#${accountId}`;
  }
}

export namespace AccountItem {
  export type Keys = {
    PK: `ACCOUNT#${string}`;
    SK: `ACCOUNT#${string}`;
    GSI1PK: `ACCOUNT#${string}`;
    GSI1SK: `ACCOUNT#${string}`;
  };

  export type Attributes = {
    id: string;
    email: string;
    externalId: string | undefined;
    createdAt: string;
  };

  export type ItemType = Keys & Attributes & {
    type: 'Account'
  };
}
