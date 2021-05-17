const express = require("express");
const {
  createUser,
  authUser,
  updateUser,
} = require("../controllers/users.controllers");
const auth = require("../middlewares/auth");

const routes = express.Router();

routes.post("/auth", authUser);

routes.post("/", createUser);

routes.put("/:id", auth, updateUser);

module.exports = routes;
