const express = require("express");
const fs = require("fs");
const app = express();

app.get("/getMovies", (req, res) => {
  fs.readFile("./Data/db.json", (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(JSON.parse(result));
    }
  });
});

app.listen(3000, () => {
  console.log("App is listening on http://localhost:3000");
});
