const express = require("express");
const {
  createUser,
  authUser,
  updateUser,
  getQtdAlbums,
} = require("../controllers/users.controllers");
const auth = require("../middlewares/auth");

const routes = express.Router();

routes.post("/auth", authUser);

routes.get("/qtdalbums", auth, getQtdAlbums);

routes.post("/", createUser);

routes.put("/:id", auth, updateUser);

module.exports = routes;
