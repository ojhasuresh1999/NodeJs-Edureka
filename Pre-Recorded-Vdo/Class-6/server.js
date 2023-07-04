const express = require("express");
//object desctructuring
const { MongoClient } = require("mongodb");
// ES5 usage of mongoclient
//const mongoClient  = require('mongodb').mongoClient;
const bodyParser = require("body-parser");
const ObjectID = require("mongodb").ObjectID;

const app = express();

const MongoURL = "mongodb://127.0.0.1:27017/";
const port = 4002;

// connection to data base
// previously mongodb has two connection string mongodb+srv:// mongodb://
// autoReconnect
// reconnectTries
// reconnectInterval
const client = new MongoClient(MongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//express middleware section
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Welcome to node js day 5 hit getOrderDetails for api response");
});
//getorderdetails end point
app.get("/getOrderDetails", (request, response) => {
  client.connect((dbconnectionerror, connection) => {
    if (dbconnectionerror) {
      response.send({
        status: 500,
        message: "db connection error",
      });
    } else {
      const db = connection.db("mydb");

      db.collection("orderDetails")
        .find()
        .toArray((err, result) => {
          if (err) {
            console.log(err);
          } else {
            response.send(result);
          }
        });
    }
  });
});

//addOrderDetails end point
app.post("/addOrderDetails", (request, response) => {
  client.connect((dbconnectionerror, connection) => {
    if (dbconnectionerror) {
      response.send({
        status: 500,
        message: "db connection error",
      });
    } else {
      const db = connection.db("mydb");
      db.collection("orderDetails").insertOne(request.body, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          response.send("order details added successfully");
        }
      });
    }
  });
});

//addOrderDetails end point
app.put("/updateOrderDetails", (request, response) => {
  client.connect((dbconnectionerror, connection) => {
    if (dbconnectionerror) {
      response.send({
        status: 500,
        message: "db connection error",
      });
    } else {
      const db = connection.db("mydb");
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
    }
  });
});

app.delete("/deleteOrderDetails", (request, response) => {
  client.connect((dbconnectionerror, connection) => {
    if (dbconnectionerror) {
      response.send({
        status: 500,
        message: "db connection error",
      });
    } else {
      const db = connection.db("mydb");
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
    }
  });
});

app.listen(port, () => {
  console.log("server started on port ", port);
});

// http status

// 1.200 304
// 2. 409 404  client side related issues
// 3. 503 505 backend code related issues
// DRY - do not repeat yourself in program
