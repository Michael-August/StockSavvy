import dotenv from "dotenv";
import { IDbConfig } from "../interfaces/dbconfig";
dotenv.config();

const dbConfig: Record<string, IDbConfig> = {
  development: {
    username: process.env.DB_USERNAME || "",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_DATABASE || "",
    host: process.env.DB_HOST || "",
    port: parseInt(process.env.DB_PORT || "5432", 10),
    seederStorage: "sequelize",
    dialect: "postgres",
  },
  production: {
    username: process.env.DB_USERNAME || "",
    password: "",
    database: process.env.DB_DATABASE || "",
    host: process.env.DB_HOST || "",
    port: parseInt(process.env.DB_PORT || "5432", 10),
    seederStorage: "sequelize",
    dialect: "postgres",
  },
};

export default dbConfig;
