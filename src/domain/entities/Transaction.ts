export class Transaction {
  id: string;
  fromAccountId: string;
  toAccountId: string;
  amount: number;
  type: "DEPOSIT" | "WITHDRAW" | "TRANSFER";
  description: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    fromAccountId: string,
    toAccountId: string,
    amount: number,
    type: "DEPOSIT" | "WITHDRAW" | "TRANSFER",
    description: string,
  ) {
    this.id = Date.now().toString();
    this.fromAccountId = fromAccountId;
    this.toAccountId = toAccountId;
    this.amount = amount;
    this.type = type;
    this.description = description;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
