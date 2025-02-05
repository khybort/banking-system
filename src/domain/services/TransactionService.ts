import { ITransactionRepository } from "../../domain/interfaces/ITransactionRepository";
import { Transaction } from "../entities/Transaction";

export class TransactionService {
  private transactionRepository: ITransactionRepository;

  constructor(transactionRepository: ITransactionRepository) {
    this.transactionRepository = transactionRepository;
  }

  async createTransaction(transaction: Transaction): Promise<Transaction> {
    return this.transactionRepository.createTransaction(transaction);
  }

  async getTransactionById(id: string): Promise<Transaction | null> {
    return this.transactionRepository.getTransactionById(id);
  }

  async getTransactions(): Promise<Transaction[]> {
    return this.transactionRepository.getTransactions();
  }

  async deleteTransaction(id: string): Promise<void> {
    return this.transactionRepository.deleteTransaction(id);
  }
}
