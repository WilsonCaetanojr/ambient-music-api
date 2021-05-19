const Joi = require("joi");
const albumsSchema = require("../schemes/albums.schemes");
const AppSuccess = require("../config/returns/AppSuccess");
const AppError = require("../config/returns/AppError");
const { Albums } = require("../models/Albums");
const { MusicsAlbum } = require("../models/MusicsAlbum");
const { Musics } = require("../models/Musics");

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

    const albumsMuscis = await MusicsAlbum.findAll({
      where: { IdAlbum: albums.map(alb => alb.Id) },
    });

    const muscis = await Musics.findAll({
      where: { Id: albumsMuscis.map(alb => alb.IdMusic) },
    });

    albums.forEach((element, index) => {
      element = element.dataValues;

      const albumMusicCurrent = albumsMuscis
        .filter(alb => alb.IdAlbum === element.Id)
        .map(item => item.IdMusic);

      const musicsCurrent = muscis.filter(
        music => albumMusicCurrent.indexOf(music.Id) !== -1
      );

      element.Musics = musicsCurrent;
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

    const schemaMusicsAlbum = { Musics: Joi.array().required() };

    const schema = Joi.object(
      Object.assign(albumsSchema.create, schemaMusicsAlbum)
    );

    body = await schema.validateAsync(body, { abortEarly: false });

    const newAlbum = await Albums.create(body);

    body.Musics.map(music => {
      try {
        if (music && music.Id) {
          MusicsAlbum.create({ IdMusic: music.Id, IdAlbum: newAlbum.Id });
        }
      } catch (error) {
        console.log("Error insert MusicsAlbum.");
      }
    });

    return AppSuccess({
      res,
      msg: "Tema cadastrado com sucesso.",
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

    console.log(Id);
    const schemaMusicsAlbum = { Musics: Joi.array() };

    const schema = Joi.object(
      Object.assign(albumsSchema.update, schemaMusicsAlbum)
    );

    body = await schema.validateAsync({ ...body, Id }, { abortEarly: false });

    const album = await Albums.findByPk(Id);

    if (!album || !req.user || album.createdBy !== req.user.Id) {
      throw new AppError(
        "Você não possui permissão para ralizar alterações neste tema."
      );
    }

    await Albums.update(body, { where: { Id } });

    if (body.Musics) {
      await MusicsAlbum.destroy({
        where: {},
        truncate: true,
      });

      body.Musics.map(music => {
        if (music && music.Id) {
          MusicsAlbum.create({ IdMusic: music.Id, IdAlbum: Id });
        }
      });
    }

    return AppSuccess({
      res,
      msg: "Tema editado com sucesso.",
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
