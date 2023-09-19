const request = require('request')

const geocode = (address, callback) => {
    const url = 'http://api.positionstack.com/v1/forward?access_key=e10b1f294167380e8730f2e036d1769c&query=' + encodeURIComponent(address)

    request({url: url, json: true}, (error, response) => {
        if (error) {
            callback('Connection Error', undefined)
        } else if (response.body.error) {
            callback('Location not found', undefined)
        } else {
            callback(undefined, {
                lat: response.body.data[0].latitude,
                long: response.body.data[0].longitude,
                location: response.body.data[0].label
            })
        }
    })
}

module.exports = geocode;