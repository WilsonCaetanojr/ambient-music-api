const express = require("express");
const {
  createUser,
  authUser,
  updateUser,
} = require("../controllers/users.controllers");
const routes = express.Router();

routes.post("/auth", authUser);

routes.post("/", createUser);

routes.put("/:id", updateUser);

module.exports = routes;
