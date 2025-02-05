export class Account {
  id: string;
  userId: string;
  balance: number;
  accountNumber: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(userId: string, balance: number) {
    this.id = Date.now().toString();
    this.userId = userId;
    this.balance = balance;
    this.accountNumber = `ACC${Math.floor(Math.random() * 1000000)}`;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
