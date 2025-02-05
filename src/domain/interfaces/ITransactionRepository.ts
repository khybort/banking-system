import { Transaction } from "../entities/Transaction";

export interface ITransactionRepository {
  createTransaction(transaction: Transaction): Promise<Transaction>;
  getTransactionById(id: string): Promise<Transaction | null>;
  getTransactionsByAccountId(accountId: string): Promise<Transaction[]>;
  getTransactions(): Promise<Transaction[]>;
  deleteTransaction(id: string): Promise<void>;
}
