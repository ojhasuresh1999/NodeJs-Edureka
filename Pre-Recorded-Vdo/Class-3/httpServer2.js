const http = require("http");
const url = require("url");
const fs = require("fs");
const path = require("path");

const PORT = 3000;

const app = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url);
  //index route
  if (parsedUrl.pathname === "/") {
    let filesLink = "<ul>";
    res.setHeader("Content-type", "text/html");
    let filesList = fs.readdirSync("./");
    filesList.forEach((elem) => {
      if (fs.statSync("./" + elem).isFile()) {
        filesLink += `<br/><li><a href = './${elem}'>
          ${elem}
        </a></li>`;
      }
    });
    filesLink += "</ul>";
    res.end("<h1>List of files: </h1>" + filesLink);
  }

  //customized route
  if (parsedUrl.pathname === "/test") {
    res.write("This is test url response");
    res.end();
  }
});

app.listen(3000, () => {
  console.log("Server is running on port: ", 3000);
});
