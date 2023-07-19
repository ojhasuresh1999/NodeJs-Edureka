const express = require("express");
const axios = require("axios");
const morgan = require("morgan");
const path = require("path");
const nodemailer = require("nodemailer");
const PORT = 6001;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("default"));
app.use("/public", express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.get("/getMovies", (req, res) => {
  const url = "http://localhost:3000/movies";
  axios
    .get(url)
    .then((response) => {
      // console.log(response.data);
      const movies = response.data;
      const result = [];
      for (let i = 0; i < movies.length; i++) {
        const currentDate = new Date();
        const movieDate = new Date(movies[i].date);
        //calculate time difference
        const timeDiff = currentDate.getTime() - movieDate.getTime();
        const dayDiff = timeDiff / (1000 * 60 * 60 * 24);
        if (dayDiff > 3) {
          movies[i].status = "expired";
        } else if (dayDiff >= 1) {
          movies[i].status = "running";
        } else {
          movies[i].status = "just released";
        }
        result.push(movies[i]);
      }
      res.render("movieHomePage.ejs", { movies: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/postMovies", (req, res) => {
  const date = new Date();
  const url = "http://localhost:3000/movies";
  req.body.date = date;

  axios
    .post(url, req.body, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(() => {
      res.redirect("/getMovies");
    })
    .catch((err) => console.log(err));
});

app.post("/sendMail", (req, res) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "frankie.weissnat@ethereal.email",
      pass: "Z7FsuYDhWdRPkWb8CN",
    },
  });

  const mailOptions = {
    from: "admin@movieBuzz.com",
    to: "frankie.weissnat@ethereal.email",
    subject: "Movie Details",
    text: `Movie Name: ${req.body.name} & Language: ${req.body.language}`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Email sent successfully...");
      res.send("Email sent successfully...");
    }
  });
});

app.listen(PORT, () => {
  console.log(`App listening on http://localhost:${PORT}`);
});
