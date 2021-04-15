const Joi = require("joi");
const musicsSchema = require("../schemes/musics.schemes");
const AppSuccess = require("../config/returns/AppSuccess");
const AppError = require("../config/returns/AppError");
const { Musics } = require("../models/Musics");

const getMusicsUser = async (req, res) => {
  try {
    if (!req.params.user || !req.user.Id)
      throw new AppError("Você não possui permissão para editar músicas.");

    const where = { createdBy: req.user.Id };

    if (req.params.id) {
      where.Id = req.params.id;
    }

    const musics = await Musics.findAll({
      where,
    });

    if (!musics || musics.lenght < 0) {
      throw new AppError("Nenhuma música encontrada.");
    }

    AppSuccess({
      res,
      data: musics,
    });
  } catch (error) {
    console.log(error);
    throw new AppError(error);
  }
};

const createMusic = async (req, res) => {
  try {
    let { body } = req;

    body.createdBy = req.user ? req.user.Id : null;

    const schema = Joi.object(musicsSchema.create);

    body = await schema.validateAsync(body, { abortEarly: false });

    await Musics.create(body);

    return AppSuccess({
      res,
      msg: "Música cadastrada com sucesso.",
      status: 201,
    });
  } catch (error) {
    console.log(error);
    throw new AppError(error);
  }
};

const updateMusic = async (req, res) => {
  try {
    let { body } = req;
    const Id = req.params.id;

    const schema = Joi.object(musicsSchema.update);

    body = await schema.validateAsync({ ...body, Id }, { abortEarly: false });

    const music = await Musics.findByPk(Id);

    if (!music || !req.user || music.createdBy !== req.user.Id) {
      throw new AppError(
        "Você não possui permissão para ralizar alterações nesta música."
      );
    }

    await Musics.update(body, { where: { Id } });

    return AppSuccess({
      res,
      msg: "Música editada com sucesso.",
    });
  } catch (error) {
    console.log(error);
    throw new AppError(error);
  }
};

module.exports = {
  getMusicsUser,
  createMusic,
  updateMusic,
};
