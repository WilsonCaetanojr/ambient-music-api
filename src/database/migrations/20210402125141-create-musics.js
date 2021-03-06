"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Musics", {
      Id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      Name: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true,
      },
      Url: {
        type: Sequelize.STRING(255),
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
    await queryInterface.dropTable("Musics");
  },
};
