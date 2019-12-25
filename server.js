'use strict';

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT;
const app = express();
const superagent = require('superagent');
app.use(cors());

app.get('/location', locationHandler);
app.get('/Weather', weatherHandler);

function locationHandler(req, res) {
    getLocation(req.query.data)
        .then(locationData =>
            res.status(200).json(locationData));
}

function getLocation(city) {
    // let data = require('./data/geo.json');
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${process.env.GOOGLE_GEOCODE_API_KEY}`;
    return superagent.get(url)
        .then(data => {            
            return new Location(city, data.body);
        })
}

function Location(city, data) {
    this.search_query = city;
    this.formatted_query = data.results[0].formatted_address;
    this.latitude = data.results[0].geometry.location.lat;
    this.longitude = data.results[0].geometry.location.lng;
}

function weatherHandler(req, res) {
    getweather(req.query.data)
        .then(weatherData => res.status(200).json(weatherData));
}

function getweather(query) {
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

app.use('*', (req, res) => {
    res.status(404).send('not found');
});

app.listen(PORT, () => console.log(`app listen to ${PORT}`));