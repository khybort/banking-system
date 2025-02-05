import { Account } from "../entities/Account";

export interface IAccountRepository {
  createAccount(account: Account): Promise<Account>;
  getAccountById(id: string): Promise<Account | null>;
  getAccounts(): Promise<Account[]>;
  deleteAccount(id: string): Promise<void>;
}
