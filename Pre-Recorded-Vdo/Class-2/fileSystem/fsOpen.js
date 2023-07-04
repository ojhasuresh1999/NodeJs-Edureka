const fs = require("fs");

fs.open("./files/info.txt", "r+", (err, fileDescriptor) => {
  if (err) throw err;
  console.log("The file is open :", fileDescriptor);
});
