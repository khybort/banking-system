import { Request, Response, NextFunction } from "express";
import { AccountService } from "../../domain/services/AccountService";
import { CreateAccountValidator } from "../validators/CreateAccountValidator";
import { Account } from "../../domain/entities/Account";

export class AccountController {
  private accountService: AccountService;

  constructor(accountService: AccountService) {
    this.accountService = accountService;
  }

  async createAccount(req: Request, res: Response, next: NextFunction) {
    try {
      await CreateAccountValidator.validateAsync(req.body);
      const account = new Account(req.body.name, req.body.balance);
      const createdAccount = await this.accountService.createAccount(account);
      res.status(201).json(createdAccount);
    } catch (error) {
      next(error);
    }
  }

  async getAccountById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const account = await this.accountService.getAccountById(id);
      if (!account) {
        res.status(404).json({ message: "Account not found" });
      } else {
        res.json(account);
      }
    } catch (error) {
      next(error);
    }
  }

  async getAccounts(req: Request, res: Response, next: NextFunction) {
    try {
      const accounts = await this.accountService.getAccounts();
      res.json(accounts);
    } catch (error) {
      next(error);
    }
  }

  async deleteAccount(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      await this.accountService.deleteAccount(id);
      res.status(204).json();
    } catch (error) {
      next(error);
    }
  }
}
