"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.addColumn("user", "businessId", {
			type: Sequelize.UUID,
			allowNull: false,
			references: {
				model: "business", // Assuming your Business model is named 'Business'
				key: "id",
			},
			defaultValue: "d29a270e-131e-44b2-8be2-1b4df06a8f8c",
			onUpdate: "CASCADE",
			onDelete: "CASCADE",
		});

		await queryInterface.addColumn("user", "verificationToken", {
			type: Sequelize.STRING,
			allowNull: true,
		});

		await queryInterface.addColumn("user", "verified", {
			type: Sequelize.BOOLEAN,
			allowNull: false,
			defaultValue: false,
		});

		await queryInterface.addColumn("user", "role", {
			type: Sequelize.STRING,
			allowNull: false,
		});

		await queryInterface.addColumn("user", "phoneNumber", {
			type: Sequelize.STRING,
			allowNull: false,
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.removeColumn("user", "businessId");
		await queryInterface.removeColumn("user", "verificationToken");
		await queryInterface.removeColumn("user", "verified");
		await queryInterface.removeColumn("user", "role");
		await queryInterface.removeColumn("user", "phoneNumber");
	},
};
