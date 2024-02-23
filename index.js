import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import * as dotenv from "dotenv";
import { measurementUnits, timeNormalizer, timeNormalizerNoOffSet, windDegInterpretator } from "./functions.js";

const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
dotenv.config();

const WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather";
const LOCATION_URL = "http://api.openweathermap.org/geo/1.0/direct";
const FORECAST_URL = "http://api.openweathermap.org/data/2.5/forecast"

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

        const forecast = await axios.get(FORECAST_URL, {
            params:{
                lat: cityData.data[0].lat,
                lon: cityData.data[0].lon,
                units: req.body.units,
                lang: req.body.lang,
                cnt: 7,
                appid: process.env.WEATHER_API,
            }
        })

        const forecastData = forecast.data.list;

        const futureForecasts = [];
        for(let i = 0; i < 7; i++){
            let hourForecast = {
            time: timeNormalizerNoOffSet(forecastData[i].dt),
            conditionImg: forecastData[i].weather[0].icon,
            condition: forecastData[i].weather[0].description,
            cloudiness: forecastData[i].clouds.all,
            windSpeed: forecastData[i].wind.speed,
            windDirection: windDegInterpretator(forecastData[i].wind.deg),
            txt: forecastData[i].dt_txt,
            };
            futureForecasts.push(hourForecast);
        }



        // 

        console.log(weatherData)
        console.log('kefir', forecastData[1])
        res.render("index.ejs", {
            info: weatherData,
            unit: measurementUnits(measurement),
            currentSunrise: timeNormalizer(weatherData.sys.sunrise, weatherData.timezone),
            currentSunset: timeNormalizer(weatherData.sys.sunset, weatherData.timezone),
            forecast: futureForecasts,
            // forecast: forecastData,
        });
    } catch (error) {
        console.error("There was an error: ", error.message);
    }
})

app.listen(port, () => {
    console.log(`The server is running on ${port} port.`);
})