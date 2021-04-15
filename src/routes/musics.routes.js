const express = require("express");
const {
  createMusic,
  updateMusic,
  getMusicsUser,
} = require("../controllers/musics.controllers");
const auth = require("../middlewares/auth");

const routes = express.Router();

routes.get("/:id?", auth, getMusicsUser);

routes.post("/", auth, createMusic);

routes.put("/:id", auth, updateMusic);

module.exports = routes;
