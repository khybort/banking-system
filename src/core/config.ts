export const config = {
    secretKey: process.env.SECRET_KEY || "secret",
    port: process.env.PORT || 8000,
    mongodbUri: process.env.MONGODB_URI || "mongodb://localhost:27017",
    databaseName: process.env.DATABASE_NAME || "banking-system",
};