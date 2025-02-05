# Banking Application

A clean architecture banking application built with Node.js, TypeScript, and MongoDB.

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Design Principles](#design-principles)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Management**: Register, update, and delete users.
- **Account Management**: Create, update, and manage user accounts.
- **Transaction Management**: Perform and track financial transactions.
- **Validation**: Input validation for user data, account information, and transactions.
- **Dependency Injection**: Utilize a DI container for loose coupling and testability.

## Project Structure
```
.
├── Dockerfile
├── LICENSE
├── Makefile
├── README.md
├── docker-compose.yml
├── logs
│   ├── combined.log
│   └── error.log
├── package-lock.json
├── package.json
├── src
│   ├── application
│   │   ├── controllers
│   │   │   ├── AccountController.ts
│   │   │   ├── AuthController.ts
│   │   │   ├── TransactionController.ts
│   │   │   └── UserController.ts
│   │   └── validators
│   │       ├── CreateAccountValidator.ts
│   │       ├── CreateTransactionValidator.ts
│   │       └── CreateUserValidator.ts
│   ├── container.ts
│   ├── core
│   │   ├── config.ts
│   │   └── types
│   │       └── express.d.ts
│   ├── domain
│   │   ├── entities
│   │   │   ├── Account.ts
│   │   │   ├── Transaction.ts
│   │   │   └── User.ts
│   │   ├── interfaces
│   │   │   ├── IAccountRepository.ts
│   │   │   ├── ITransactionRepository.ts
│   │   │   └── IUserRepository.ts
│   │   ├── services
│   │   │   ├── AccountService.ts
│   │   │   ├── TransactionService.ts
│   │   │   └── UserService.ts
│   │   └── types
│   │       └── userRole.ts
│   ├── index.ts
│   ├── infrastructure
│   │   ├── database
│   │   │   └── MongoDBConnection.ts
│   │   ├── logger.ts
│   │   └── repositories
│   │       ├── AccountRepositoryImpl.ts
│   │       ├── TransactionRepositoryImpl.ts
│   │       └── UserRepositoryImpl.ts
│   └── middleware
│       ├── asyncHandler.ts
│       ├── authorization.ts
│       ├── errorHandler.ts
│       └── validator.ts
├── tests
│   └── unit
│       └── UserService.test.ts
└── tsconfig.json
```

## Getting Started

### Prerequisites

Before getting started, ensure you have the following installed:

- [Node.js 16+](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- npm or yarn (package manager)

### Installation

Follow these steps to get the application running locally:

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/banking-application.git
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Start the application:

    ```bash
    npm run start
    ```

### Configuration

- Update the MongoDB connection string in `src/infrastructure/database/MongoDBConnection.ts` to point to your MongoDB instance.

### Environment Variables

The following environment variables are required:

- `MONGO_URI`: MongoDB connection string
- `SECRET_KEY`: JWT secret key (for authentication)

Create a `.env` file in the root of the project to configure these variables.

## Design Principles

This project adheres to the following principles:

- **Clean Architecture**: The application is structured into layers (domain, application, infrastructure) to separate concerns and improve maintainability.
- **Object-Oriented Programming (OOP)**: Classes and interfaces are used to define entities and services.
- **Single Responsibility Principle (SRP)**: Each module/class has a single responsibility.
- **Dependency Inversion Principle (DIP)**: High-level modules depend on abstractions, not concrete implementations.
- **Don't Repeat Yourself (DRY)**: Reusable code and components to avoid duplication.

## Testing

### Unit Tests

Run unit tests with the following command:

```bash
npm run test:unit
```
### E2E Tests
Run end-to-end tests with the following command:
```
bash
npm run test:e2e
```
### Linting and Formatting
Ensure your code follows consistent style and formatting by running:
```
bash
npm run format
```
## Contributing
We welcome contributions! To get started:

- Fork the repository.
- Create a new feature branch.
- Make your changes.
- Commit your changes with meaningful messages.
- Push to the branch.
- Open a Pull Request to the main repository.
- Please ensure your code follows the project's coding standards and includes tests where applicable.

## License
This project is licensed under the MIT License.
