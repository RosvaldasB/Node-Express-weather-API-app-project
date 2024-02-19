import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
// import country from "./countries.json" assert {type: "json"};

const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const WEATHER_URL = "https://api.openweathermap.org/data/3.0/onecall";
// ?lat={lat}&lon={lon}&exclude={part}&appid={API key}
const LOCATION_URL = "https://geokeo.com/geocode/v1/search.php";
// q=empire+state+building&api=YOUR_API_KEY

app.get("/", (req, res) => {
    res.render("index.ejs");
})



app.listen(port, () => {
    console.log(`The server is running on ${port} port.`);
})