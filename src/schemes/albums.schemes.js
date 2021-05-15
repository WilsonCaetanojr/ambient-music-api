const Joi = require("joi");
const { Albums } = require("../models/Albums");
const { Users } = require("../models/Users");
const { Genres } = require("../models/Genres");
const { existsByPk } = require("./config/genericValidations");
const JoyError = require("./config/JoyError");

const uniqueName = async value => {
  const nameExists = await Albums.findOne({ where: { Name: value } });

  if (nameExists) {
    throw new JoyError("Name already exists");
  }

  return value;
};

module.exports = {
  create: {
    Id: Joi.any().strip(),
    IdUser: Joi.number().external(value =>
      existsByPk({ value, model: Users, key: "IdUser" })
    ),
    Name: Joi.string().max(50).required().external(uniqueName),
    Description: Joi.string().max(50).required(),
    IdGenre: Joi.number()
      .required()
      .external(value => existsByPk({ value, model: Genres, key: "IdGenre" })),
    Intensity: Joi.number().required(),
    createdBy: Joi.number()
      .required()
      .external(value => existsByPk({ value, model: Users, key: "IdUser" })),
  },

  update: {
    Id: Joi.number()
      .required()
      .external(value => existsByPk({ value, model: Albums, key: "IdMusic" })),
    IdUser: Joi.number().external(value =>
      existsByPk({ value, model: Users, key: "IdUser" })
    ),
    Name: Joi.string().max(50).external(uniqueName),
    Description: Joi.string().max(50),
    IdGenre: Joi.number().external(value =>
      existsByPk({ value, model: Genres, key: "IdGenre" })
    ),
    Intensity: Joi.number(),
    createdBy: Joi.any().strip(),
  },
};
