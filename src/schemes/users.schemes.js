const Joi = require("joi");
const { Users } = require("../models/Users");
const JoyError = require("./config/JoyError");

const userExists = async value => {
  const user = await Users.findByPk(value);

  if (!user) {
    throw new JoyError("User does not exist");
  }

  return value;
};

const uniqueEmail = async value => {
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
    Password: Joi.string().min(5).max(10).required(),
    FlagActive: Joi.boolean().required(),
  },

  update: {
    Id: Joi.number().required().external(userExists),
    Name: Joi.string().max(50),
    Email: Joi.string().max(50).external(uniqueEmail),
    Password: Joi.string().min(5).max(10),
    FlagActive: Joi.boolean(),
  },
};
