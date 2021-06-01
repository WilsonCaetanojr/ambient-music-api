const Joi = require("joi");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const usersSchema = require("../schemes/users.schemes");
const AppSuccess = require("../config/returns/AppSuccess");
const AppError = require("../config/returns/AppError");
const { Users } = require("../models/Users");
const { Albums } = require("../models/Albums");

const authUser = async (req, res) => {
  try {
    let { body } = req;

    const schema = Joi.object({
      Email: Joi.string().max(50).required(),
      Password: Joi.string().max(15).required(),
    });

    body = await schema.validateAsync(body, { abortEarly: false });

    const user = await Users.findOne({
      where: { Email: body.Email, FlagActive: true },
      attributes: ["Id", "Name", "Email", "Password"],
    });

    if (!user) {
      throw new AppError("Usuário ou senha inválido.");
    }

    const validPassword = await bcrypt.compare(body.Password, user.Password);

    if (!validPassword) {
      throw new AppError("Usuário ou senha inválido.");
    }

    delete user.dataValues.Password;

    const token = jwt.sign(
      {
        Id: user.Id,
        Name: user.Name,
        Email: user.Email,
      },
      process.env.JWT_PRIVATE_KEY
    );

    AppSuccess({
      res,
      data: {
        Id: user.Id,
        Name: user.Name,
        Email: user.Email,
        Token: token,
      },
    });
  } catch (error) {
    console.log(error);
    throw new AppError(error);
  }
};

const createUser = async (req, res) => {
  try {
    let { body } = req;

    const schema = Joi.object(usersSchema.create);

    body = await schema.validateAsync(body, { abortEarly: false });

    const salt = await bcrypt.genSalt(10);
    body.Password = await bcrypt.hash(body.Password, salt);

    await Users.create(body);

    return AppSuccess({
      res,
      msg: "Usuário criado com sucesso.",
      status: 201,
    });
  } catch (error) {
    console.log(error);
    throw new AppError(error);
  }
};

const updateUser = async (req, res) => {
  try {
    let { body } = req;
    const Id = req.params.id;

    const schema = Joi.object(usersSchema.update);

    body = await schema.validateAsync({ ...body, Id }, { abortEarly: false });

    if (body.Password) {
      const salt = await bcrypt.genSalt(10);
      body.Password = await bcrypt.hash(body.Password, salt);
    }

    await Users.update(body, { where: { Id } });

    return AppSuccess({
      res,
      msg: "Usuário editado com sucesso.",
    });
  } catch (error) {
    console.log(error);
    throw new AppError(error);
  }
};

const getQtdAlbums = async (req, res) => {
  try {
    if (!req.user || !req.user.Id) AppError("Usuário não encontrado.");

    const albumsUser = await Albums.findAll({
      where: { createdBy: req.user.Id },
    });

    return AppSuccess({
      res,
      msg: "Usuário editado com sucesso.",
      data: { QtdAlbums: albumsUser.length },
    });
  } catch (error) {
    console.log(error);
    throw new AppError(error);
  }
};

module.exports = {
  authUser,
  createUser,
  updateUser,
  getQtdAlbums,
};
