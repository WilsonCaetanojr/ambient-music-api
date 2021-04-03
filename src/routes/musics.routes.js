const express = require("express");
const {
  createMusic,
  updateMusic,
  getMusics,
} = require("../controllers/musics.controllers");
const auth = require("../middlewares/auth");

const routes = express.Router();

routes.get("/:id?", auth, getMusics);

routes.post("/", auth, createMusic);

routes.put("/:id", auth, updateMusic);

module.exports = routes;
