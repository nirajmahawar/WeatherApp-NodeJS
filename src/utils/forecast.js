const request = require('request');

const forecast = (latitude,longitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=69292ced1151a256f7b110428b4e26ed&query='+latitude+','+longitude;
    request({ url: url, json: true }, (error, response,body) => {
        if (error) {
            callback('Unable to connect to forecast services!', undefined);
        } else if (response.body.error) {
            callback('Unable to find location. Try another search.',undefined);
        } else {
            callback(undefined, body.current);
        }
    })
}

module.exports = forecast;