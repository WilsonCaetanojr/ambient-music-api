require("express-async-errors");
require("dotenv/config");
var cors = require("cors");
const express = require("express");
const indexRoutes = require("./routes");

const setupCors = (app) => {
  const whiteList = process.env.WHITE_LIST_CORS;
  console.log("Initializing cors with white list: ", whiteList);
  var corsOptions = {
    origin: (origin, callback) => {
      if (!origin || whiteList.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed"));
      }
    },
  };

  app.use(cors(corsOptions));
};

try {
  const app = express();

  setupCors(app);

  app.use(express.json());
  app.use(bodyParser.json({ limit: "20mb", extended: true }));

  indexRoutes.map((route) =>
    app.use(
      route.name.replace(/[\\]/g, "/").replace(".routes", ""),
      route.route
    )
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

  app.listen(process.env.SERVER_PORT);
  console.log(`API listening on port ${process.env.SERVER_PORT}`);
} catch (error) {
  return console.log("An error ocurred on app starting", error);
}
