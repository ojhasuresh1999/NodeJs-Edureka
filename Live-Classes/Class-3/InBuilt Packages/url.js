const url = require("url");

const urlAddress = "https://learning.edureka.co/join-class/27260?year=2015";

const parseURL = url.parse(urlAddress, true);

console.log(parseURL);