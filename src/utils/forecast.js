const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=4dc35b6e1acb61302704a55c838c2d29&query='+ encodeURIComponent(lat) + ',' + encodeURIComponent(long) + '&units=m'

    request({url: url, json: true}, (error, response) => {
        if (error) {
            callback('Connection Error', undefined)
        } else if (response.body.error) {
            callback('Location not found', undefined)
        } else {
            callback(undefined, response.body.current.weather_descriptions[0] + '. It is currently ' + response.body.current.temperature
            + ' degrees out. It feels like ' + response.body.current.feelslike + ' degrees. Humidity is ' + response.body.current.humidity + '%.')
        }
    })
}

module.exports = forecast;