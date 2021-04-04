const Sequelize = require("sequelize");
const { sequelize } = require("../database/connection");

const attributes = {
  Id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  IdUser: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      key: "Id",
      model: "Users",
    },
  },
  Name: {
    type: Sequelize.STRING(50),
    allowNull: false,
    unique: true,
  },
  Description: {
    type: Sequelize.STRING(50),
    allowNull: false,
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

const Musics = sequelize.define("Musics", attributes);

exports.Musics = Musics;
exports.attributes = attributes;
