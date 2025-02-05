import { UserService } from '../../src/domain/services/UserService';
import { UserRepositoryImpl } from '../../src/infrastructure/repositories/UserRepositoryImpl';
import { User } from '../../src/domain/entities/User';
import { MongoDBConnection } from '../../src/infrastructure/database/MongoDBConnection';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: UserRepositoryImpl;

  beforeEach(async () => {
    userRepository = new UserRepositoryImpl();
    userService = new UserService(userRepository);
    await MongoDBConnection.getInstance().connect();
  });

  afterEach(async () => {
    await MongoDBConnection.getInstance().dropDatabase();
  });

  it('should create a new user', async () => {
    const user = new User('test', 'test@example.com', 'password');
    const createdUser = await userService.createUser(user);
    expect(createdUser.id).toBeDefined();
    expect(createdUser.username).toBe('test');
    expect(createdUser.email).toBe('test@example.com');
  });
});