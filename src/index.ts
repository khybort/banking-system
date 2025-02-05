import express from "express";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { logger, morganMiddleware } from "./infrastructure/logger";
import errorHandler from "./middleware/errorHandler";
import { validateBody } from "./middleware/validator";
import { asyncHandler } from "./middleware/asyncHandler";

import { Container } from "./container";
import { CreateUserValidator } from "./application/validators/CreateUserValidator";
import { CreateAccountValidator } from "./application/validators/CreateAccountValidator";
import { CreateTransactionValidator } from "./application/validators/CreateTransactionValidator";
import { config } from "./core/config";

const app = express();
app.use(helmet());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

app.use(limiter);
app.use(morganMiddleware);

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Banking System API",
      version: "1.0.0",
      description: "API documentation for the banking system",
    },
    servers: [
      {
        url: `http://localhost:${config.port}}`,
      },
    ],
  },
  apis: ["./src/application/controllers/*.ts"],
};
const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const userController = Container.getInstance().userController;
const accountController = Container.getInstance().accountController;
const transactionController = Container.getInstance().transactionController;
const authController = Container.getInstance().authController;

app.post("/api/auth/login",asyncHandler(authController.login));
app.post("/api/auth/register", asyncHandler(authController.register));

// User Routes
app.post(
  "/api/users",
  validateBody(CreateUserValidator),
  userController.createUser,
);
app.get("/api/users/:id", userController.getUserById);
app.get("/api/users", userController.getUsers);
app.delete("/api/users/:id", userController.deleteUser);

// Account Routes
app.post(
  "/api/accounts",
  validateBody(CreateAccountValidator),
  accountController.createAccount,
);
app.get("/api/accounts/:id", accountController.getAccountById);
app.get("/api/accounts", accountController.getAccounts);
app.delete("/api/accounts/:id", accountController.deleteAccount);

// Transaction Routes
app.post(
  "/api/transactions",
  validateBody(CreateTransactionValidator),
  transactionController.createTransaction,
);
app.get("/api/transactions/:id", transactionController.getTransactionById);
app.get("/api/transactions", transactionController.getTransactions);
app.delete("/api/transactions/:id", transactionController.deleteTransaction);

app.use(errorHandler);
app.listen(config.port, () => {
  logger.info(`Server is running on port ${config.port}`);
});
