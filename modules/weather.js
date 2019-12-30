`use strict`

const superagent = require('superagent')

let weather = {}

weather.getWeather = function (query) {
    // let data = require('./data/darksky.json');
    const url = `https://api.darksky.net/forecast/${process.env.DARKSKY_API_KEY}/${query.latitude},${query.longitude}`;
    return superagent.get(url)
        .then(data => {
            let weather = data.body;
            return weather.daily.data.map((day) => {
                return new Weather(day);
            });
        });

}

function Weather(day) {
    this.forecast = day.summary;
    this.time = new Date(day.time * 1000).toDateString();
}

module.exports=weather;