const express = require("express");
const {
  createAlbum,
  updateAlbum,
  getAlbumsUser,
} = require("../controllers/albums.controllers");
const auth = require("../middlewares/auth");

const routes = express.Router();

routes.get("/:id?", auth, getAlbumsUser);

routes.post("/", auth, createAlbum);

routes.put("/:id", auth, updateAlbum);

module.exports = routes;
