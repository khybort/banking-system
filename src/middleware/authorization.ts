import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { config } from "../core/config";

export const authorize = (roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.header("Authorization")?.replace("Bearer ", "");

            if (!token) {
                return res.status(401).json({ message: "Access denied. No token provided." });
            }

            const decoded = jwt.verify(token, config.secretKey) as unknown;

            const decodedToken = decoded as { userId: string; role: string };

            if (!roles.includes(decodedToken.role)) {
                return res.status(403).json({ message: "Forbidden." });
            }

            // Assign decoded token to req.user
            req.user = decodedToken;

            next();
        } catch (error) {
            return res.status(500).json({ message: error instanceof Error ? error.message : "Internal Server Error" });
        }
    };
};
