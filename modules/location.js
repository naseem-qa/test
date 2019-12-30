`use strict`

const superagent = require('superagent')
const client = require('./client.js')

const location = {}

 location.getLocation = function (city) {
    let SQL = 'SELECT * FROM locations WHERE formatted_query = $1'
    let values = [city];

    return client.query(SQL, values)
        .then(results => {
            if (results.rowCount) {
                return results.rows[0]
            } else {
                const url = `https://us1.locationiq.com/v1/search.php?key=${process.env.GEOCODE_API_KEY}&q=${city}&format=json`

                return superagent.get(url)
                    .then(data => {
                        cacheLocation(city, data.body)
                    })
            }
        })
        .catch (error =>{
            console.error(error);
        })

}


function cacheLocation(city, data) {

    const location = new Location(data);
    let SQL = 'INSERT INTO locations (formatted_query ,display_name, latitude, longitude) VALUES ($1,$2,$3,$4)';
    let values = [city, location.display_name, location.latitude, location.longitude];
    return client.query(SQL, values)
        .then(results => {
            const savedLocation = results.rows[0];
            return savedLocation;

        })
}

function Location(data) {
    this.display_name = data[0].display_name;
    this.latitude = data[0].lat;
    this.longitude = data[0].lon;
}

module.exports = location;
