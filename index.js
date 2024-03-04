import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import * as dotenv from "dotenv";
import { measurementUnits, timeNormalizer, timeNormalizerNoOffSet, windDegInterpretator, airQuality } from "./functions.js";

const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
dotenv.config();

const WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather";
const LOCATION_URL = "http://api.openweathermap.org/geo/1.0/direct";
const FORECAST_URL = "http://api.openweathermap.org/data/2.5/forecast"
const WALLPAPER_URL = "https://api.unsplash.com/search/photos";
const POLUTION_URL = "http://api.openweathermap.org/data/2.5/air_pollution/forecast";

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

        const wallpaper = await axios.get(WALLPAPER_URL, {
            params: {
                query: requestCity,
                client_id: process.env.UNPLASH_ACCESS,
                per_page: 1,
            },
        });

        const wallpaperData = wallpaper.data.results[0].urls.small;

        const polution = await axios.get(POLUTION_URL, {
            params: {
                lat: cityData.data[0].lat,
                lon: cityData.data[0].lon,
                appid: process.env.WEATHER_API,
            },
        });

        const polutionData = polution.data.list[0].main.aqi;

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
            temp: forecastData[i].main.temp,
            cloudiness: forecastData[i].clouds.all,
            windSpeed: forecastData[i].wind.speed,
            windDirection: windDegInterpretator(forecastData[i].wind.deg),
            windDirectionArrow: forecastData[i].wind.deg,
            rain: forecastData[i].rain,
            snow: forecastData[i].snow,
            };
            futureForecasts.push(hourForecast);
        }

        res.render("index.ejs", {
            cityTitle: " - " + weatherData.name,
            info: weatherData,
            unit: measurementUnits(measurement),
            currentSunrise: timeNormalizer(weatherData.sys.sunrise, weatherData.timezone),
            currentSunset: timeNormalizer(weatherData.sys.sunset, weatherData.timezone),
            forecast: futureForecasts,
            currentWindDirection: windDegInterpretator(weatherData.wind.deg),
            airQuality: airQuality(polutionData),
            wallpaperBg: wallpaperData,
        });
    } catch (error) {
        console.error("There was an error: ", error.message);
    }
})

app.listen(port, () => {
    console.log(`The server is running on ${port} port.`);
})