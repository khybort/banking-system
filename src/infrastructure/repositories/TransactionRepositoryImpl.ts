import { ITransactionRepository } from "../../domain/interfaces/ITransactionRepository";
import { Transaction } from "../../domain/entities/Transaction";
import { MongoDBConnection } from "../database/MongoDBConnection";

export class TransactionRepositoryImpl implements ITransactionRepository {
  private db = MongoDBConnection.getInstance().getDb();

  async createTransaction(transaction: Transaction): Promise<Transaction> {
    const result = await this.db
      .collection("transactions")
      .insertOne(transaction);
    transaction.id = result.insertedId.toString();
    return transaction;
  }

  async getTransactionById(id: string): Promise<Transaction | null> {
    const transaction = await this.db
      .collection("transactions")
      .findOne({ id });
    return transaction
      ? new Transaction(
          transaction.fromAccountId,
          transaction.toAccountId,
          transaction.amount,
          transaction.type,
          transaction.description,
        )
      : null;
  }

  async getTransactionsByAccountId(accountId: string): Promise<Transaction[]> {
    const transactions: Transaction[] = await this.db
      .collection("transactions")
      .find({
        $or: [{ fromAccountId: accountId }, { toAccountId: accountId }],
      })
      .toArray();

    return transactions.map(
      (transaction) =>
        new Transaction(
          transaction.fromAccountId,
          transaction.toAccountId,
          transaction.amount,
          transaction.type,
          transaction.description,
        ),
    );
  }

  async getTransactions(): Promise<Transaction[]> {
    const transactions: Transaction[] = await this.db
      .collection("transactions")
      .find()
      .toArray();
    return transactions.map(
      (transaction) =>
        new Transaction(
          transaction.fromAccountId,
          transaction.toAccountId,
          transaction.amount,
          transaction.type,
          transaction.description,
        ),
    );
  }

  async deleteTransaction(id: string): Promise<void> {
    await this.db.collection("transactions").deleteOne({ id });
  }
}
