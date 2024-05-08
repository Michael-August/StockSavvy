"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		return await queryInterface.createTable("business", {
			id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.UUID,
				defaultValue: Sequelize.literal("uuid_generate_v4()::uuid"), // Explicitly cast to UUID
			},
			businessName: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			businessAddress: {
				type: Sequelize.STRING,
			},
			businessDescription: {
				type: Sequelize.STRING,
			},
		});
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add reverting commands here.
		 *
		 * Example:
		 * await queryInterface.dropTable('users');
		 */
		await queryInterface.dropTable("business");
	},
};
