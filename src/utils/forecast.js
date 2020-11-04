const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=f266961c8f358d81cf291dd0dbfd0bda&query='+encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude)
    request({ url, json: true}, (error, { body } = {}) => {
        if(error){
            callback('Unable to connect to weather service!', undefined)
        }else if(body.error){
            callback(body.error.info, undefined)
        }else{
            callback(undefined, {
                description: body.current.weather_descriptions[0], 
                temperature: body.current.temperature, 
                feelslike: body.current.feelslike,
                humidity: body.current.humidity,
            })
        }
    })
}

module.exports = {
    'forecast': forecast   
}