import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import * as dotenv from "dotenv";

const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
dotenv.config();

const WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather";
const LOCATION_URL = "http://api.openweathermap.org/geo/1.0/direct";

app.get("/", (req, res) => {
    res.render("index.ejs");
})

app.post("/get-city", async (req, res) => {
    try{
        const requestCity = req.body.city;
        const cityData = await axios.get(LOCATION_URL, {
            params: {
                q: req.body.city,
                limit: 1,
                appid: process.env.WEATHER_API,
            }
        });
        const weatherReport = await axios.get(WEATHER_URL, {
            params: {
                lat: cityData.data[0].lat,
                lon: cityData.data[0].lon,
                units: req.body.units,
                lang: req.body.lang,
                appid: process.env.WEATHER_API,
            },
        })
        console.log(weatherReport.data);
        res.render("index.ejs");
    } catch (error) {
        console.error("There was an error: ", error.message);
    }
})

app.listen(port, () => {
    console.log(`The server is running on ${port} port.`);
})