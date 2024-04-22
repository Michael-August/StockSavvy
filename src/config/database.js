import Sequelize from "sequelize";
import dotenv from "dotenv";

import dbConfig from "../config/config.js";

dotenv.config();

const env = process.env.NODE_ENV || "development";
const config = dbConfig[env];

const db = new Sequelize(
	config.database,
	config.username,
	config.password,
	config
);

export default db;
