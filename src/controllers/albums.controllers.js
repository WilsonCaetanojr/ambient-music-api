const Joi = require("joi");
const albumsSchema = require("../schemes/albums.schemes");
const AppSuccess = require("../config/returns/AppSuccess");
const AppError = require("../config/returns/AppError");
const { Albums } = require("../models/Albums");

const getAlbumsUser = async (req, res) => {
  try {
    if (!req.user.Id)
      throw new AppError("Você não possui permissão para acessar os álbuns.");

    const where = { createdBy: req.user.Id };

    if (req.params.id) {
      where.Id = req.params.id;
    }

    const albums = await Albums.findAll({
      where,
    });

    if (!albums || albums.length < 1) {
      throw new AppError("Você ainda não possui álbuns.");
    }

    AppSuccess({
      res,
      data: albums,
    });
  } catch (error) {
    console.log(error);
    throw new AppError(error);
  }
};

const createAlbum = async (req, res) => {
  try {
    let { body } = req;

    body.createdBy = req.user ? req.user.Id : null;

    const schema = Joi.object(albumsSchema.create);

    body = await schema.validateAsync(body, { abortEarly: false });

    await Albums.create(body);

    return AppSuccess({
      res,
      msg: "Álbum cadastrado com sucesso.",
      status: 201,
    });
  } catch (error) {
    console.log(error);
    throw new AppError(error);
  }
};

const updateAlbum = async (req, res) => {
  try {
    let { body } = req;
    const Id = req.params.id;

    const schema = Joi.object(albumsSchema.update);

    body = await schema.validateAsync({ ...body, Id }, { abortEarly: false });

    const album = await Albums.findByPk(Id);

    if (!album || !req.user || album.createdBy !== req.user.Id) {
      throw new AppError(
        "Você não possui permissão para ralizar alterações neste álbum."
      );
    }

    await Albums.update(body, { where: { Id } });

    return AppSuccess({
      res,
      msg: "Álbum editada com sucesso.",
    });
  } catch (error) {
    console.log(error);
    throw new AppError(error);
  }
};

module.exports = {
  getAlbumsUser,
  createAlbum,
  updateAlbum,
};
