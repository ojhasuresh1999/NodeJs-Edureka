const express = require("express");
const carModel = require("../models/car");

const carRouter = express.Router();

carRouter
  .post("/addCarDetails", (req, res) => {
    carModel
      .create(req.body)
      .then((results) => {
        res.status(200).send("Car details added successfully");
        console.log(results);
      })
      .catch((err) => {
        res.send(err.message);
      });
  })
  .get("/getCarDetails", (req, res) => {
    carModel
      .find()
      .then((data) => {
        res.send(`Car details retrieved successfully... ${data}`);
      })
      .catch((err) => {
        res.send(err.message);
      });
  })
  .put("/updateCarDetails", (req, res) => {
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
  })
  .delete("/deleteCarDetails", (req, res) => {
    carModel
      .findOneAndDelete({ manufacturer: req.body.manufacturer })
      .then((data) => {
        res.send("Car details deleted successfully...");
      })
      .catch((err) => {
        res.send(err.message);
      });
  });

module.exports = carRouter;
