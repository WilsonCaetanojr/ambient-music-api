require("express-async-errors");
require("dotenv/config");
const express = require("express");
const indexRoutes = require("./routes");

try {
  const app = express();

  app.use(express.json());

  indexRoutes.map(route =>
    app.use(route.name.replace(/[\\]/g, "/"), route.route)
  );

  app.use((err, req, res, _next) => {
    if (!err.customValidation) {
      return res.status(500).json({
        success: false,
        errors: [`Internal server error ${err.message}`],
      });
    }

    return res.status(err.statusCode).send(err.message);
  });

  app.listen(3333);
  console.log(`API listening on port ${3333}`);
} catch (error) {
  return console.log("An error ocurred on app starting", error);
}
