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

app.post("/weather-report", async (req, res) => {
    try{
        const requestCity = req.body.city;
        const measurement = req.body.units;
        const cityData = await axios.get(LOCATION_URL, {
            params: {
                q: req.body.city,
                limit: 1,
                appid: process.env.WEATHER_API,
            }
        });

        function measurementUnits(unit) {
            let temp;
            let atmos = "hPa";
            let percent = "%";
            let visibility = "m";
            let windSpeed = "m/s";
            let precipitation = "mm";
            let deg = "°";
            switch(unit){
                case 'metric':
                    temp = "°C";
                    break;
                case 'imperial':
                    temp = "°F";
                    windSpeed = "ft/s";
                    break;
            }
            return { temp, windSpeed, atmos, percent, visibility, precipitation, deg };
        }

        function timeNormalizer(time, timeOffSet){
            const date = new Date(time * 1000);
            const localTime = new Date(date.getTime() + timeOffSet * 1000);
            return localTime.toLocaleTimeString();
        }

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
        console.log(weatherData)
        // console.log("log", measurementUnits(measurement))
        res.render("index.ejs", {
            info: weatherData,
            unit: measurementUnits(measurement),
            currentSunrise: timeNormalizer(weatherData.sys.sunrise, weatherData.timezone),
            currentSunset: timeNormalizer(weatherData.sys.sunset, weatherData.timezone),
        });
    } catch (error) {
        console.error("There was an error: ", error.message);
    }
})

app.listen(port, () => {
    console.log(`The server is running on ${port} port.`);
})