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

const Genres = sequelize.define("Genres", attributes);

exports.Genres = Genres;
exports.attributes = attributes;
