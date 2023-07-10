const express = require("express");
const morgan = require("morgan");
const path = require('path')
const Router = require("./routes/products_router");

const PORT = 4006;
const app = express();

app.use(morgan("default"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", Router);
app.set("view engine", "ejs");

app.use("/public", express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.listen(PORT, () => {
  console.log(`App is listening on http://localhost:${PORT}`);
});
