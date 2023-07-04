const express = require("express");
const bodyParser = require("body-parser");
const ObjectID = require("mongodb").ObjectID;
const connectToMongoDb = require("./db/checkdb");
const client = require("./db/config");

const port = 4002;
const app = express();

connectToMongoDb();

//express middleware section
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//db connection
let db;
client.connect((dbconnectionerror, connection) => {
  if (dbconnectionerror) {
    response.send({
      status: 500,
      message: "db connection error",
    });
  } else {
    db = connection.db("mydb");
  }
});

//index route
app.get("/", (req, res) => {
  res.send("Welcome to node js day 5 hit getOrderDetails for api response");
});

app.get("/getOrderDetails", (request, response) => {
  db.collection("orderDetails")
    .find()
    .toArray((err, result) => {
      if (err) {
        console.log(err);
      } else {
        response.send(result);
      }
    });
});

app.post("/addOrderDetails", (request, response) => {
  db.collection("orderDetails").insertOne(request.body, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      response.send("order details added successfully");
    }
  });
});

app.put("/updateOrderDetails", (request, response) => {
  db.collection("orderDetails").updateOne(
    { _id: ObjectID(request.body._id) },
    {
      $set: {
        price: request.body.price,
        restaurant: request.body.restaurant,
      },
    },
    request.body,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        response.send("order details updated successfully");
      }
    }
  );
});

app.delete("/deleteOrderDetails", (request, response) => {
  db.collection("orderDetails").deleteOne(
    { _id: ObjectID(request.body._id) },
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        response.send("order details removed successfully");
      }
    }
  );
});

app.listen(port, () => {
  console.log("server started on port ", port);
});
