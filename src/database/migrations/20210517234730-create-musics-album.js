"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("MusicsAlbum", {
      Id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      IdAlbum: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          key: "Id",
          model: "Albums",
        },
      },
      IdMusic: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          key: "Id",
          model: "Musics",
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
    await queryInterface.dropTable("MusicsAlbum");
  },
};
