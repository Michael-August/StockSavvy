import { Sequelize } from "sequelize";
import db from "../config/database.js";

const User = db.define(
	"user",
	{
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		email: {
			type: Sequelize.STRING,
			allowNull: false,
			unique: true,
		},
		password: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		firstName: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		lastName: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		createdAt: {
			type: Sequelize.DATE,
			allowNull: false,
			field: "created_at",
		},
		updatedAt: {
			type: Sequelize.DATE,
			allowNull: false,
			field: "updated_at",
		},
	},
	{
		tableName: "user",
	}
);

export default User;
