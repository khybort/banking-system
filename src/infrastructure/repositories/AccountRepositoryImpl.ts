import { IAccountRepository } from "../../domain/interfaces/IAccountRepository";
import { Account } from "../../domain/entities/Account";
import { MongoDBConnection } from "../database/MongoDBConnection";

export class AccountRepositoryImpl implements IAccountRepository {
  private db = MongoDBConnection.getInstance().getDb();

  async createAccount(account: Account): Promise<Account> {
    const result = await this.db.collection("accounts").insertOne(account);
    account.id = result.insertedId.toString();
    return account;
  }

  async getAccountById(id: string): Promise<Account | null> {
    const account = await this.db.collection("accounts").findOne({ id });
    return account ? new Account(account.userId, account.balance) : null;
  }

  async getAccounts(): Promise<Account[]> {
    const accounts: Account[] = await this.db
      .collection("accounts")
      .find()
      .toArray();
    return accounts.map(
      (account) => new Account(account.userId, account.balance),
    );
  }

  async deleteAccount(id: string): Promise<void> {
    await this.db.collection("accounts").deleteOne({ id });
  }
}
