const express = require("express");
const fs = require("fs");
const axios = require("axios");

const app = express();

// index route
app.get("/", (req, res) => {
  res.send("Welcome to the server");
});



app.listen(3000, () => {
  console.log("App is listening on port 3000");
});
