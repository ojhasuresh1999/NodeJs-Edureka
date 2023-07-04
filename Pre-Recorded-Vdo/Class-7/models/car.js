const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const carModel = new Schema({
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  color: { type: String, required: true },
  price: { type: Number, required: true },
});

module.exports = mongoose.model("carModel", carModel, "carModel");
