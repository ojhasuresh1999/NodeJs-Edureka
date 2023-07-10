const express = require("express");
const products = require("../models/products");

const router = express.Router();

router
  .post("/addProduct", (req, res) => {
    products
      .create(req.body)
      .then((data) => {
        res.redirect("/api/getProducts");
      })
      .catch((err) => {
        res.send(err.message);  
      });
  })
  .get("/", (req, res) => {
    products.find().then((data) => {
      res.render("form.ejs");
    });
  })
  .get("/getProducts", (req, res) => {
    products
      .find()
      .then((data) => {
        res.render("products.ejs", { productsData: data });
      })
      .catch((err) => console.log(err));
  })
  .put("/updateProduct", (req, res) => {
    products
      .findOneAndUpdate(
        { title: req.body.title },
        {
          $set: {
            price: req.body.price,
            rating: req.body.rating,
          },
        }
      )
      .then((data) => {
        res.send("Product details updated successfully...");
        console.log(data);
      });
  })
  .delete("/deleteProduct", (req, res) => {
    products.deleteMany({ title: req.body.title }).then((data) => {
      res.send("Product details deleted successfully...");
    });
  });

module.exports = router;
