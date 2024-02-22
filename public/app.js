// function for API wind deg interpretation

function windDegInterpretator(deg){
    let windDirection;
    switch(deg){
        case deg >= 351 || deg <= 9:
            return windDirection = 'N'
            break;
        case deg >= 10 && deg <= 80:
            windDirection = 'NE'
            break;
        case deg >= 81 && deg <= 100:
            windDirection = 'E'
            break;
        case deg >= 101 && deg <= 170:
            windDirection = 'SE'
            break;
        case deg >= 171 && deg <= 190:
            windDirection = 'S'
            break;
        case deg >= 191 && deg <= 260:
            windDirection = 'SW' 
            break;
        case deg >= 261 && deg <= 280:
            windDirection = 'W'
            break;
        case deg >= 281 && deg <= 350:
            windDirection = 'NW'
            break
        default:
            windDirection = 'There is no wind';
    }

    return windDirection;
}