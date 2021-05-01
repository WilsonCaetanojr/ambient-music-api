const Sequelize = require("sequelize");
const { sequelize } = require("../database/connection");

const attributes = {
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
};

const MusicsAlbum = sequelize.define("MusicsAlbum", attributes);

exports.MusicsAlbum = MusicsAlbum;
exports.attributes = attributes;
