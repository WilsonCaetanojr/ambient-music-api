const Sequelize = require("sequelize");
const { sequelize } = require("../database/connection");

const attributes = {
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
  Intensity: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  IdGenre: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      key: "Id",
      model: "Genres",
    },
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
};

const Albums = sequelize.define("Albums", attributes);

exports.Albums = Albums;
exports.attributes = attributes;

// Albums.sync({ force: true });
