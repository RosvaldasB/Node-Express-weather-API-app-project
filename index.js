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
        const weatherData = weatherReport.data;
        console.log(weatherData, weatherData.weather[0].main, weatherData.main.temp )
        res.render("index.ejs", {
            info: weatherData
            // weatherCondition: weatherData.weather[0].description,
            // weatherIcon: weatherData.weather[0].icon,
            // mainData: weatherData.main,
            // visibility: weatherData.visibility,
            // wind: weatherData.wind,
            // cloudiness: weatherData.clouds.all,
            // rain: weatherData.rain,
            // snow: weatherData.snow,
            // sunrise: weatherData.sys.sunrise,
            // sunset: weatherData.sys.sunset,
            // country: weatherData.sys.country,
            // timezone: weatherData.timezone,
            // cityName: weatherData.name,
        });
    } catch (error) {
        console.error("There was an error: ", error.message);
    }
})

app.listen(port, () => {
    console.log(`The server is running on ${port} port.`);
})