import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { UserService } from "../../domain/services/UserService";
import { User } from "../../domain/entities/User";
import { logger } from "../../infrastructure/logger";
import { config } from "../../core/config";

export class AuthController {
    private userService: UserService;
    
      constructor(userService: UserService) {
        this.userService = userService;
      }
    async login(req: Request, res: Response): Promise<Response> {
        try {
            const { username, password } = req.body;
            const user = await this.userService.getUserByUsername(username);
            
            if (!user) {
                return res.status(401).json({ message: "Invalid credentials" });
            }

            if (!(await this.comparePasswords(password, user.password))) {
                return res.status(401).json({ message: "Invalid credentials" });
            }
            const token = jwt.sign(
                { userId: user.id, role: user.role },
                config.secretKey,
                { expiresIn: "1h" }
            );

            return res.status(200).json({ token });
        } catch (error: unknown) {
            if (error instanceof Error) {
                logger.error(
                    `Error logging in user: ${req.body.username}\nError: ${error.message}`
                );
                return res.status(500).json({ message: error.message });
            } else {
                return res.status(500).json({ message: "Internal Server Error" });
            }
        }
    }

    async register(req: Request, res: Response): Promise<Response> {
        try {
            const user = new User(
                req.body.username,
                req.body.email,
                req.body.password,
            );

            const createdUser = await this.userService.createUser(user);
            return res.status(201).json(createdUser);
        } catch (error: unknown) {
            if (error instanceof Error) {
                logger.error(
                    `Error logging in user: ${req.body.username}\nError: ${error.message}`
                );
                return res.status(500).json({ message: error.message });
                } else {
                return res.status(500).json({ message: "Internal Server Error" });
            }
        }
    }

    private async comparePasswords(plainPassword: string, hashedPassword: string): Promise<boolean> {
        return plainPassword === hashedPassword;
    }
}