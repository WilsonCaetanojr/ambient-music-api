const Joi = require("joi");
const { Users } = require("../models/Users");
const { existsByPk } = require("./config/genericValidations");
const JoyError = require("./config/JoyError");

const uniqueEmail = async value => {
  if (!value) return value;

  const emailExists = await Users.findOne({ where: { Email: value } });

  if (emailExists) {
    throw new JoyError("Email already exists");
  }

  return value;
};

module.exports = {
  create: {
    Id: Joi.any().strip(),
    Name: Joi.string().max(50).required(),
    Email: Joi.string().max(50).required().external(uniqueEmail),
    Password: Joi.string().min(5).max(15).required(),
    FlagActive: Joi.boolean().required(),
  },

  update: {
    Id: Joi.number()
      .required()
      .external(value => existsByPk({ value, model: Users, key: "IdUser" })),
    Name: Joi.string().max(50),
    Email: Joi.string().max(50).external(uniqueEmail),
    Password: Joi.string().min(5).max(15),
    FlagActive: Joi.boolean(),
  },
};
