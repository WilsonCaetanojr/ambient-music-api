const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.SERVER_HOST,
    dialect: "postgres",
    define: {
      timestamps: true,
      paranoid: true,
      freezeTableName: true,
    },
  }
);

exports.sequelize = sequelize;
