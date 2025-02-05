import { Request, Response, NextFunction } from "express";
import { User } from "../../domain/entities/User";
import { UserService } from "../../domain/services/UserService";
import { logger } from "../../infrastructure/logger";
export class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const user = new User(
        req.body.username,
        req.body.email,
        req.body.password,
      );
      const createdUser = await this.userService.createUser(user);
      res.status(201).json(createdUser);
    } catch (error) {
      next(error);
    }
  }

  async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const user = await this.userService.getUserById(id);
      if (!user) {
        res.status(404).json({ message: "User not found" });
      } else {
        res.json(user);
      }
    } catch (error) {
      logger.error(
        `Error retrieving user by ID: ${req.params.id}\nError: ${error}`
      )
      next(error);
    }
  }

  async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await this.userService.getUsers();
      res.json(users);
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      await this.userService.deleteUser(id);
      res.status(204).json();
    } catch (error) {
      next(error);
    }
  }
}
