'use strict';

//Lode Enviroment Variable From the .env file 
require('dotenv').config();

//App Dependencies
const express = require('express');
const cors = require('cors');

//APP Setp 
const PORT = process.env.PORT;
const app = express();
app.use(cors());

//Our Dependencies
const client = require('./modules/client.js');
const location = require('./modules/location.js');
const weather = require('./modules/weather.js');
const events = require('./modules/events.js');
const movies = require('./modules/movies.js');
const yelp = require('./modules/yelp.js');
const trails = require('./modules/trails.js');

//Rout Definitions
app.get('/location', locationHandler);
app.get('/Weather', weatherHandler);
app.get('/events', eventHandler);
app.get('/yelp', yelpHandler);
app.get('/movies', moviesHandler);
app.get('/trails', trailsHandler);

app.use(`*`, notFound);
app.use(errorHandler);


//location
function locationHandler(req, res) {
    // const city = req.query.city
    location.getLocation(req.query.city)
        .then(locationData => {
            res.status(200).json(locationData)
        })
        .catch(error => {
            errorHandler(error, req, res)
        })
}

//weather 
function weatherHandler(req, res) {

    weather.getWeather(req.query)
        .then(weatherData => {
            res.status(200).json(weatherData)
        })
        .catch(error => {
            eventHandler(error, req, res)
        })
}

//Event
function eventHandler(req, res) {
    events.getEvent(req.query)
        .then(eventData => {
            res.status(200).json(eventData)
        })
        .catch(error => {
            eventHandler(error, req, res)
        })
}

//Yelp 
function yelpHandler(req, res) {
    yelp.getYelp(req.query)
        .then(yelpData => {
            res.status(200).json(yelpData)
        })
        .catch(error => {
            eventHandler(error, req, res)
        })
}

//Movies
function moviesHandler(req, res) {
    movies.getMovies(req.query)
        .then(movieData => {
            res.status(200).json(movieData)
        })
        .catch(error => {
            eventHandler(error, req, res)
        })
}

//Trail

function trailsHandler(req, res) {
    trails.getTrails(req.query)
        .then(trailsData => {
            res.status(200).json(trailsData)
        })
        .catch(error => {
            eventHandler(error, req, res)
        })
}

///////////////
function notFound(req, res) {
    res.status(404).send('Not Found')
}

function errorHandler(error, req, res) {
    res.status(500).send(error)
}

client.connect()
    .then(
        app.listen(PORT, () => console.log(`app listen to ${PORT}`))
    )