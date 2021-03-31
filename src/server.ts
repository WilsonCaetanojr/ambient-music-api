import express from "express";

const app = express();

app.get("/", (req, res) => res.send("Hello"));

app.listen(3333, () => {
  console.log("Server port: 3333");
});
