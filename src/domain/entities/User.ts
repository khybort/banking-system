import { UserRole } from "../types/userRole";

export class User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  password: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(username: string, email: string, password: string) {
    this.id = Date.now().toString();
    this.username = username;
    this.email = email;
    this.role = UserRole.User;
    this.password = password;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
