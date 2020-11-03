const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoibW9zdGFmYXNheWVkZmF0aGkiLCJhIjoiY2tncWxmYjN2MW83bDJ4cnhjczF3ZnVodCJ9.Nz43Eo463Sy5Icdx4bTpoA&limit=1'
    request({ url, json: true }, (error, { body } = {}) => {
        if(error){
            callback('Unable to connect to location service!', undefined)
        }else if(body.features){
            if(body.features.length === 0){
                callback('Unable to find the specified location!', undefined)
            }else{
                callback(undefined, {
                    latitude: body.features[0].center[1],
                    longitude: body.features[0].center[0],
                    location: body.features[0].place_name
                })
            }
        }
    })
}

module.exports = {
    'geocode': geocode
}