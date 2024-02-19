import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import country from "./countries.json" assert {type: "json"};

const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const API_URL = "https://api.open-meteo.com/v1/forecast";

app.get("/", (req, res) => {
    res.render("index.ejs");
})

app.listen(port, () => {
    console.log(`The server is running on ${port} port.`);
    console.log(country[1]);
})