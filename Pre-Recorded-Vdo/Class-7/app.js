const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const carRouter = require("./routes/carRoutes");

const PORT = 4003;
const app = express();

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api", carRouter);

//template engine
app.set("view engine", "ejs");

// mongoose connection to database
mongoose.connect("mongodb://127.0.0.1:27017/carDB");

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.listen(PORT, () => {
  console.log(`App is listening on port : http://localhost:${PORT}`);
});
