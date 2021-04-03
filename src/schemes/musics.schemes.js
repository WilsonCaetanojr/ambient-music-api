const Joi = require("joi");
const { Musics } = require("../models/Musics");
const JoyError = require("./config/JoyError");

const musicExists = async value => {
  const music = await Musics.findByPk(value);

  if (!music) {
    throw new JoyError("Music does not exist");
  }

  return value;
};

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
    Id: Joi.number().required().external(musicExists),
    Name: Joi.string().max(50).external(uniqueName),
    Url: Joi.string().max(255),
  },
};
