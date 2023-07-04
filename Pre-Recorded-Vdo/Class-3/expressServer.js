const express = require("express");
const path = require("path");
const app = express();

app.get("/", (req, res) => {
  res.send("This is a Hello World! from express");
});

app.get("/html", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(3000, () => {
  console.log("App is listening on http://localhost:3000");
});
