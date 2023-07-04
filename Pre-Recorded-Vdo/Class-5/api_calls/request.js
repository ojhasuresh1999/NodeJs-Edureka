const express = require("express");
const fs = require("fs");
const requestObjectTP = require("request");

const app = express();

// index route
app.get("/", (req, res) => {
  res.send("Welcome to the server");
});

app.get("/getEmployees", (request, response) => {
  // Third party(TP) server url
  const url = "http://5c055de56b84ee00137d25a0.mockapi.io/api/v1/employees";

  requestObjectTP(url, { json: true }, (err, res, body) => {
    if (err) {
      console.log("Unable to connect to server" + err.message);
    } else if (res.body.err) {
      console.log("Server related error: " + res.body.err);
    } else {
      let currentEmployees = [];
      console.log("API returned body" + body);
      for (let index = 0; index < body.length; index++) {
        const employee = {
          name: body[index].name,
          createdAt: body[index].createdAt,
        };
        currentEmployees.push(employee);
      }
      response.send(currentEmployees);
    }
  });
});

app.listen(3000, () => {
  console.log("App is listening on port 3000");
});
