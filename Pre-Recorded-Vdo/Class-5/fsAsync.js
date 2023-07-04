const fs = require("fs");

fs.readFile("text1.txt", (err, data) => {
  if (err) {
    console.log(err);
  } else {
    fs.readFile("text2.txt", (err, data) => {
      if (err) {
        console.log(err);
      } else {
        fs.readFile("text3.txt", (err, data) => {
          if (err) {
            console.log(err);
          } else {
            fs.readFile("text4.txt", (err, data) => {
              if (err) {
                console.log(err);
              } else {
                console.log(data.toString());
              }
            });
          }
        });
      }
    });
  }
});
