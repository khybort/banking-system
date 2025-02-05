import { User } from "../entities/User";

export interface IUserRepository {
  createUser(user: User): Promise<User>;
  getUserById(id: string): Promise<User | null>;
  getUserByUsername(username: string): Promise<User | null>;
  getUsers(): Promise<User[]>;
  deleteUser(id: string): Promise<void>;
}
