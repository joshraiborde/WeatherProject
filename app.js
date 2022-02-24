const express = require("express");

const https = require("https");

const app = express();

const port = 3000;

const url = "https://api.openweathermap.org/data/2.5/weather?q=London&appid=0274a09ee480777ac8006a69cddb1ec8&units=imperial"


app.get("/", (req, res) => {

    https.get(url, (response) => {
        console.log(response);
    })

    res.send("Server is up and running!")
})


app.listen(3000, () =>{
    console.log("Server is running on Port " + port)
})