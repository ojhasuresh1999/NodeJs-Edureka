const express = require("express");
const fs = require("fs");
const port = 5000;
const data = require("./db.json");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// app.get("/getData", (req, res) => {
//   res.send(data);
// });

app.get("/getData", (req, res) => {
  fs.readFile("./db.json", (err, data) => {
    if (err) throw err;
    res.send(JSON.parse(data));
  });
});

app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});
