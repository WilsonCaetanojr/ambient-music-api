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
  },
  Image: {
    type: Sequelize.STRING(10000),
    allowNull: true,
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
};

const Albums = sequelize.define("Albums", attributes);

exports.Albums = Albums;
exports.attributes = attributes;
