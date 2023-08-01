const express = require("express");
const request = require("request");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "public")));
// View Engine configuration
app.set("view engine", "ejs");

const url =
  "https://api.openweathermap.org/data/2.5/forecast?lat=22.1939241&lon=87.4009165&appid=96d4c8087e63ac3862bf850085f773fd";

app.get("/", (req, res) => {
  res.send("Welcome to the weather application");
});

app.get("/api/weather", (req, res) => {
  request(url, (err, rsponse, body) => {
    if (err) {
      console.log(err);
    } else {
      const output = JSON.parse(body);
      res.render("index.ejs", { output, title: "Weather App" });
      // res.send(output);
    }
  });
});

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
