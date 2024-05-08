"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.addColumn("user", "created_at", {
			allowNull: false,
			type: Sequelize.DATE,
		});
		await queryInterface.addColumn("user", "updated_at", {
			allowNull: false,
			type: Sequelize.DATE,
		});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.removeColumn("user", "created_at");
		await queryInterface.removeColumn("user", "updated_at");
	},
};
