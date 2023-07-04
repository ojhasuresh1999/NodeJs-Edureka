const http = require("http");

const app = http.createServer((req, res) => {
  res.write("Welcome to nodejs");
  res.end();
});

app.listen(3000, () => {
  console.log("Server is running on port: ", 3000);
});
