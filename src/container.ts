import { UserRepositoryImpl } from "./infrastructure/repositories/UserRepositoryImpl";
import { AccountRepositoryImpl } from "./infrastructure/repositories/AccountRepositoryImpl";
import { TransactionRepositoryImpl } from "./infrastructure/repositories/TransactionRepositoryImpl";
import { UserService } from "./domain/services/UserService";
import { AccountService } from "./domain/services/AccountService";
import { TransactionService } from "./domain/services/TransactionService";
import { UserController } from "./application/controllers/UserController";
import { AccountController } from "./application/controllers/AccountController";
import { TransactionController } from "./application/controllers/TransactionController";
import { AuthController } from "./application/controllers/AuthController";

export class Container {
  private static instance: Container;

  private constructor() {}

  public static getInstance(): Container {
    if (!Container.instance) {
      Container.instance = new Container();
    }
    return Container.instance;
  }

  get userController(): UserController {
    return new UserController(new UserService(new UserRepositoryImpl()));
  }

  get accountController(): AccountController {
    return new AccountController(
      new AccountService(new AccountRepositoryImpl()),
    );
  }

  get transactionController(): TransactionController {
    return new TransactionController(
      new TransactionService(new TransactionRepositoryImpl()),
    );
  }
  get authController(): AuthController {
    return new AuthController(
      new UserService(new UserRepositoryImpl())
    )
  }
}
