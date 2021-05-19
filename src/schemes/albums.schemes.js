const Joi = require("joi");
const { Albums } = require("../models/Albums");
const { Users } = require("../models/Users");
const { existsByPk } = require("./config/genericValidations");
const JoyError = require("./config/JoyError");

const uniqueName = async value => {
  if (!value) return value;
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
    Image: Joi.string(),
    Description: Joi.string().max(50).required(),
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
    Image: Joi.string(),
    Description: Joi.string().max(50),
    Intensity: Joi.number(),
    createdBy: Joi.any().strip(),
  },
};
