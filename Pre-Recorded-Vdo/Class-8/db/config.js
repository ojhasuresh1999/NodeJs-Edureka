const mongoose = require("mongoose");

main().catch((err) => console.log(err));

async function main() {                       
  await mongoose.connect("mongodb://127.0.0.1:27017/productDB");
  console.log("Database is connected successfully");

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

module.exports = main();
