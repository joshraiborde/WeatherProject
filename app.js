const { timeStamp } = require("console");
const { response } = require("express");
const express = require("express");
const https = require("https");
require("dotenv").config();

const bodyParser = require("body-parser"); // installed npm i body-parser

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.urlencoded())

const port = 3000;
var now = new Date();

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  // var city = req.body.cityname

  // console.log("Post request received for " + city + " on " + now.toUTCString())
  const query0 = req.body.cityname
  const query = query0.charAt(0).toUpperCase() + query0.slice(1);
  const apiKey = process.env.API_KEY;
  const units = "imperial";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&appid=" +
    apiKey +
    "&units=" +
    units;
  var now = new Date();

  https.get(url, (response) => {
    console.log("The Status code is: " + response.statusCode);

    response.on("data", (data) => {
      // console.log("the data is: " + data)
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

      // res.write("<html>")
      // res.type("html")
      res.write(
        "<h1>The Temp in " +
          query +
          " is " +
          temp +
          "F on " +
          now.toUTCString() +
          "!</h1>"
      );
      res.write("<p>It looks like " + description + " outside!!</p>");
      res.write("<img src=" + imageUrl + ">");
      res.write('<a href="/"><button id="butt_index">' +
      '   home' +
      '</button></a>')
      res.send();

      console.log("The Temp is: " + temp + "F");
      console.log("It looks like " + description + " outside!!");

    });
  });
});

app.listen(port, () => {
  console.log("Server is running on Port " + port + " on " + now.toUTCString());
});
