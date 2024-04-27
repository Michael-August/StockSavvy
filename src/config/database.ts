import dotenv from "dotenv";
import { Sequelize } from "sequelize";

import dbConfig from "./config";

dotenv.config();

const env: string = process.env.NODE_ENV || "development";
const config: any = dbConfig[env];

const db: Sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

export default db;