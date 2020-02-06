const request = require('request')

const forecast = (lat,long, callback) => {
    var url = 'https://api.darksky.net/forecast/82d6104517a4cb0d3cedc4ac46ad00cc/'+lat+','+long

    request({url, json: true}, (error,{body}) => {
        if (error) {
            callback("An error occurred. Please check connectivity.",undefined)
        } else if (body.error)
        {
            callback('Unable to find weather for specifed location. Please check the values supplied.',undefined)
        } else
        {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })

}

module.exports = forecast