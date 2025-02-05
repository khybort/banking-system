import { Request, Response, NextFunction } from "express";
import { TransactionService } from "../../domain/services/TransactionService";
import { Transaction } from "../../domain/entities/Transaction";

export class TransactionController {
  private transactionService: TransactionService;

  constructor(transactionService: TransactionService) {
    this.transactionService = transactionService;
  }

  async createTransaction(req: Request, res: Response, next: NextFunction) {
    try {
      const transaction = new Transaction(
        req.body.fromAccountId,
        req.body.toAccountId,
        req.body.amount,
        req.body.type,
        req.body.description,
      );
      const createdTransaction =
        await this.transactionService.createTransaction(transaction);
      res.status(201).json(createdTransaction);
    } catch (error) {
      next(error);
    }
  }

  async getTransactionById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const transaction = await this.transactionService.getTransactionById(id);
      if (!transaction) {
        res.status(404).json({ message: "Transaction not found" });
      } else {
        res.json(transaction);
      }
    } catch (error) {
      next(error);
    }
  }

  async getTransactions(req: Request, res: Response, next: NextFunction) {
    try {
      const transactions = await this.transactionService.getTransactions();
      res.json(transactions);
    } catch (error) {
      next(error);
    }
  }

  async deleteTransaction(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      await this.transactionService.deleteTransaction(id);
      res.status(204).json();
    } catch (error) {
      next(error);
    }
  }
}
