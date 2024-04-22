import dotenv from "dotenv";
dotenv.config();

const dbConfig = {
	development: {
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_DATABASE,
		host: process.env.DB_HOST,
		port: process.env.DB_PORT,
		seederStorage: "sequelize",
		dialect: "postgres",
	},
	// test: {
	// 	username: "root",
	// 	password: null,
	// 	database: "database_test",
	// 	host: "127.0.0.1",
	// 	dialect: "postgres",
	// },
	production: {
		username: process.env.DB_USERNAME,
		password: "",
		database: process.env.DB_DATABASE,
		host: process.env.DB_HOST,
		port: process.env.DB_PORT,
		seederStorage: "sequelize",
		dialect: "postgres",
	},
};

export default dbConfig;
