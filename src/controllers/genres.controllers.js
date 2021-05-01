const AppSuccess = require("../config/returns/AppSuccess");
const AppError = require("../config/returns/AppError");
const { Genres } = require("../models/Genres");

const getGenres = async (req, res) => {
  try {
    const where = {};

    if (req.params.id) {
      where.Id = req.params.id;
    }

    const genres = await Genres.findAll({
      where,
    });

    if (!genres || genres.lenght < 0) {
      throw new AppError("Nenhuma música encontrada.");
    }

    AppSuccess({
      res,
      data: genres,
    });
  } catch (error) {
    console.log(error);
    throw new AppError(error);
  }
};

module.exports = {
  getGenres,
};
