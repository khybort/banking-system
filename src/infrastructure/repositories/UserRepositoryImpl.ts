import { IUserRepository } from "../../domain/interfaces/IUserRepository";
import { User } from "../../domain/entities/User";
import { MongoDBConnection } from "../database/MongoDBConnection";

export class UserRepositoryImpl implements IUserRepository {
  private db = MongoDBConnection.getInstance().getDb();

  async createUser(user: User): Promise<User> {
    const result = await this.db.collection("users").insertOne(user);
    user.id = result.insertedId.toString();
    return user;
  }

  async getUserById(id: string): Promise<User | null> {
    const user = await this.db.collection("users").findOne({ id });
    return user ? new User(user.username, user.email, user.password) : null;
  }

  async getUsers(): Promise<User[]> {
    const users: User[] = await this.db.collection("users").find().toArray();
    return users.map(
      (user) => new User(user.username, user.email, user.password),
    );
  }

  async getUserByUsername(username: string): Promise<User | null> {
    const user = await this.db.collection("users").findOne({ username });
    return user? new User(user.username, user.email, user.password) : null;
  }

  async deleteUser(id: string): Promise<void> {
    await this.db.collection("users").deleteOne({ id });
  }
}
