const request = require('request');

const weather = (lat,long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=9eb637c653f3979672036d3d9770ebfe&query='+lat+','+long;
    request({url, json:true }, (error, {body}) => {
    if(error){
        callback('error occured', undefined);
    }
    else if(body.error)
    {
        callback('unable to find location. Try other location', undefined);
    }
    else
    {
        callback(undefined, body.current.weather_descriptions[0] +'. It is currently '+body.current.temperature+' degrees out. It feels like '+body.current.feelslike+' degrees out')
    }
    })
}

module.exports = weather;