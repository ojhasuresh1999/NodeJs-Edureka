const express = require("express");
const mongoose = require("mongoose");
const carModel = require("./models/car");

const PORT = 4003;
const app = express();

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// mongoose connection to database
mongoose.connect("mongodb://127.0.0.1:27017/carDB");

app.get("/", (req, res) => {
  res.send("Hello World! from mongoose integration api");
});

app.post("/addCarDetails", (req, res) => {
  carModel
    .create(req.body)
    .then((results) => {
      res.status(200).send("Car details added successfully");
      console.log(results);
    })
    .catch((err) => {
      res.send(err.message);
    });
});

app.get("/getCarDetails", (req, res) => {
  carModel
    .find()
    .then((data) => {
      res.send(`Car details retrieved successfully... ${data}`);
    })
    .catch((err) => {
      res.send(err.message);
    });
});

app.put("/updateCarDetails", (req, res) => {
  carModel
    .findOneAndUpdate(
      { name: req.body.name },
      {
        $set: {
          price: req.body.price,
          color: req.body.color,
        },
      },
      req.body
    )
    .then((data) => {
      res.send("Car details updated successfully...");
    })
    .catch((err) => {
      res.send(err.message);
    });
});

app.delete("/deleteCarDetails", (req, res) => {
  carModel
    .findOneAndDelete({ manufacturer: req.body.manufacturer })
    .then((data) => {
      res.send("Car details deleted successfully...");
    })
    .catch((err) => {
      res.send(err.message);
    });
});

app.listen(PORT, () => {
  console.log(`App is listening on port : http://localhost:${PORT}`);
});
