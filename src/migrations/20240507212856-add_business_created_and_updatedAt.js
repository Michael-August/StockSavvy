"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.addColumn("business", "created_at", {
			allowNull: false,
			type: Sequelize.DATE,
		});
		await queryInterface.addColumn("business", "updated_at", {
			allowNull: false,
			type: Sequelize.DATE,
		});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.removeColumn("business", "created_at");
		await queryInterface.removeColumn("business", "updated_at");
	},
};
