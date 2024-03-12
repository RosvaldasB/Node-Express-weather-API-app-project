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

    // if(deg >= 351 || deg <= 9){
    //     windDirection = 'N';
    // } else if(deg >= 10 && deg <= 80){
    //     windDirection = 'NE';
    // } else if(deg >= 81 && deg <= 100){
    //     windDirection = 'E';
    // } else if(deg >= 101 && deg <= 170){
    //     windDirection = 'SE';
    // } else if(deg >= 171 && deg <= 190){
    //     windDirection = 'S';
    // } else if(deg >= 191 && deg <= 260){
    //     windDirection = 'SW' ;
    // } else if(deg >= 261 && deg <= 280){
    //     windDirection = 'W';
    // } else if(deg >= 281 && deg <= 350){
    //     windDirection = 'NW';
    // } else {
    //     windDirection = 'No wind';
    // }

    switch(true){
        case (deg >= 351 || deg <= 9):
            windDirection = 'N';
            break;
        case (deg >= 10 && deg <= 80):
            windDirection = 'NE';
            break;
        case (deg >= 81 && deg <= 100):
            windDirection = 'E';
            break;
        case (deg >= 101 && deg <= 170):
            windDirection = 'SE';
            break;
        case (deg >= 171 && deg <= 190):
            windDirection = 'S';
            break;
        case (deg >= 191 && deg <= 260):
            windDirection = 'SW';
            break;
        case (deg >= 261 && deg <= 280):
            windDirection = 'W';
            break;
        case (deg >= 281 && deg <= 350):
            windDirection = 'NW';
            break;
        default:
            windDirection = 'No wind';
    }

    return windDirection;
}

// function that takes in air quality index and returns a simple result(good,)

export function airQuality(value){
    let aircondition;
    if(value === 1){
        aircondition = "good";
    } else if (value === 2){
        aircondition = "fair";
    } else if (value === 3){
        aircondition = "moderate";
    } else if (value === 4){
        aircondition = "poor";
    } else if (value === 5){
        aircondition = "very poor";
    }

    return aircondition;
}