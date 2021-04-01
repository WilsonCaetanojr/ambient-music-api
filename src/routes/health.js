const express = require("express");

const routes = express.Router();

routes.get("/", async (req, res) => {
  res.status(200).send("ok");
});

module.exports = routes;
