import winston from "winston";
import morgan from "morgan";

// Winston Logger Konfigürasyonu
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),
  transports: [
    new winston.transports.File({ filename: "/logs/error.log", level: "error" }),
    new winston.transports.File({ filename: "/logs/combined.log" }),
    new winston.transports.Console(),
  ],
});

// Morgan Middleware ile Winston Logger'ı bağlama
const stream = {
  write: (message: string) => {
    logger.info(message.trim());
  },
};

const morganMiddleware = morgan("combined", { stream });

export { logger, morganMiddleware };
