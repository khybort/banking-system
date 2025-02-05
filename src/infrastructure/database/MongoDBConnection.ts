import { MongoClient } from "mongodb";
import { config } from "../../core/config";

export class MongoDBConnection {
  private static instance: MongoDBConnection;
  private client!: MongoClient;
  private db: any;

  private constructor() {}

  public static getInstance(): MongoDBConnection {
    if (!MongoDBConnection.instance) {
      MongoDBConnection.instance = new MongoDBConnection();
    }
    return MongoDBConnection.instance;
  }

  public async connect(): Promise<void> {
    if (!this.client) {
      this.client = new MongoClient(config.mongodbUri);
      this.db = (await this.client.connect()).db(config.databaseName);
    }
  }

  public async dropDatabase(): Promise<void> {
    await this.db.dropDatabase();
  }

  public getDb(): any {
    return this.db;
  }
}
