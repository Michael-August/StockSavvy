"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.changeColumn("user", "password", {
			type: Sequelize.STRING,
			allowNull: true,
		});
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.changeColumn("user", "password", {
			type: Sequelize.STRING,
			allowNull: false,
		});
	},
};
