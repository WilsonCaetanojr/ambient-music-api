const Joi = require("joi");
const { Musics } = require("../models/Musics");
const { existsByPk } = require("./config/genericValidations");
const JoyError = require("./config/JoyError");

const uniqueName = async value => {
  const nameExists = await Musics.findOne({ where: { Name: value } });

  if (nameExists) {
    throw new JoyError("Name already exists");
  }

  return value;
};

module.exports = {
  create: {
    Id: Joi.any().strip(),
    Name: Joi.string().max(50).required().external(uniqueName),
    Url: Joi.string().max(255).required(),
  },

  update: {
    Id: Joi.number()
      .required()
      .external(value => existsByPk({ value, model: Musics, key: "IdMusic" })),
    Name: Joi.string().max(50).external(uniqueName),
    Url: Joi.string().max(255),
  },
};
