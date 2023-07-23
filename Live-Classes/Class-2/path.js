const path = require("path");

const testPath =
  "D:/EduReka/NodeJs-Edureka/Pre-Recorded-Vdo/Class-2/package.json";

console.log(path.dirname(testPath));
console.log(path.basename(testPath));
console.log(path.extname(testPath));
console.log(path.isAbsolute(testPath));
console.log(path.parse(testPath));

