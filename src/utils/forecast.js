const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=0fb3cd50f6bd453282d5b384877e8ef9&query=' + lat + ',' + long + '&units=f'
    request({url, json: true}, (error, {body}) => {
        //url in es6  shorthand syntax

        if (error) {
            callback("unable to connect to weather services", undefined)
        }

        else if (body.error) {
            callback("unable to find the location based on the given coordinates")
        }

        else {
            callback(undefined, {
                temp: body.current.temperature, 
                feelsLike : body.current.feelslike,
                description: body.current.weather_descriptions[0],
                region: body.location.region, 
                precipitation: body.current.precip, 
                windSpeed: body.current.wind_speed
            })

        }
    })

}

module.exports = forecast