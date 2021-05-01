const express = require("express");
const { getGenres } = require("../controllers/genres.controllers");
const auth = require("../middlewares/auth");

const routes = express.Router();

routes.get("/:id?", auth, getGenres);

module.exports = routes;
