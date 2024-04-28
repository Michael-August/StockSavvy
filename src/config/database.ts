import dotenv from "dotenv";
import { Sequelize } from "sequelize";
// import dbConfig from "./config";

dotenv.config();

const env: string = process.env.NODE_ENV || "development";
// const config: any = dbConfig[env];

const db: Sequelize = new Sequelize(
  process.env.DB_DATABASE || "",
  process.env.DB_USERNAME || "",
  process.env.DB_PASSWORD || "",
  {
    host: process.env.DB_HOST || "",
    port: parseInt(process.env.DB_PORT || "5432", 10),
    dialect: "postgres",
    define: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  },
);

export default db;