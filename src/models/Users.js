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
  Email: {
    type: Sequelize.STRING(50),
    allowNull: false,
  },
  Password: {
    type: Sequelize.STRING(80),
    allowNull: false,
  },
  FlagActive: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: true,
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

const Users = sequelize.define("Users", attributes);

exports.Users = Users;
exports.attributes = attributes;
