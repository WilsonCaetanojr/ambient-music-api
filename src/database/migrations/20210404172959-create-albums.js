"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Albums", {
      Id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      Name: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      Image: {
        type: Sequelize.STRING(10000),
        allowNull: false,
      },
      Intensity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      Description: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      createdBy: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          key: "Id",
          model: "Users",
        },
      },
      createdAt: {
        type: Sequelize.DATE(),
      },
      updatedAt: {
        type: Sequelize.DATE(),
      },
      deletedAt: {
        type: Sequelize.DATE(),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Albums");
  },
};
