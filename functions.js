// Applies units when unit measurement system is called when making API request from OpenWeatherMap, because the data returned is just numbers without specified units

export function measurementUnits(unit) {
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

// API data requests from OpenWeatherMap returns unix time, the function turn the unix time to normal readable time

export function timeNormalizer(time, timeOffSet){
    const date = new Date(time * 1000);
    const localTime = new Date(date.getTime() + timeOffSet * 1000);
    return localTime.toLocaleTimeString();
}

// returns readable time, but there is no offset from timezone differances

export function timeNormalizerNoOffSet(time){
    const date = new Date(time * 1000);
    return date.toLocaleTimeString();
}

// API return degrees when callind making request and getting wind related data (wind speed, wind direction, wind gust speed), because the wind direction is just degrees, the function returns directions insteand of numbers

export function windDegInterpretator(deg){
    let windDirection;

    if(deg >= 351 || deg <= 9){
        windDirection = 'N';
    } else if(deg >= 10 && deg <= 80){
        windDirection = 'NE';
    } else if(deg >= 81 && deg <= 100){
        windDirection = 'E';
    } else if(deg >= 101 && deg <= 170){
        windDirection = 'SE';
    } else if(deg >= 171 && deg <= 190){
        windDirection = 'S';
    } else if(deg >= 191 && deg <= 260){
        windDirection = 'SW' ;
    } else if(deg >= 261 && deg <= 280){
        windDirection = 'W';
    } else if(deg >= 281 && deg <= 350){
        windDirection = 'NW';
    } else {
        windDirection = 'No wind';
    }

    return windDirection;
}