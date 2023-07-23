const fs = require("fs");

const quote = "No beauty shines than that of a good heart 😊😊😊";

fs.writeFile("awesome.html", quote, (err) => {
  console.log("Completed");
});

fs.writeFile("awesome.ppt", quote, (err) => {
  console.log("Completed");
});

for (let i = 1; i < 10; i++) {
  fs.writeFile(`./Backup/text - ${i}.html`, quote, (err) => {
    console.log("Completed");
  });
}

console.log(process.argv);

fs.readFile(
  "D:/EduReka/NodeJs-Edureka/Pre-Recorded-Vdo/Class-2/package.json",
  "utf-8",
  (err, data) => {
    if (err) {
      console.log(err.message);
    } else {
      console.log(data);
    }
  }
);

fs.unlink("awesome.html", (err) => console.log("deleted file successfully"));

fs.readdir("./Backup", (err, data) => {
  if (err) throw err;
  console.log(data);
});
