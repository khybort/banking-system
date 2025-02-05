import { IAccountRepository } from "../../domain/interfaces/IAccountRepository";
import { Account } from "../entities/Account";

export class AccountService {
  private accountRepository: IAccountRepository;

  constructor(accountRepository: IAccountRepository) {
    this.accountRepository = accountRepository;
  }

  async createAccount(account: Account): Promise<Account> {
    return this.accountRepository.createAccount(account);
  }

  async getAccountById(id: string): Promise<Account | null> {
    return this.accountRepository.getAccountById(id);
  }

  async getAccounts(): Promise<Account[]> {
    return this.accountRepository.getAccounts();
  }

  async deleteAccount(id: string): Promise<void> {
    return this.accountRepository.deleteAccount(id);
  }
}
