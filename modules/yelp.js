
`use strict`;

const superagent = require('superagent')

const yelp = {}

yelp.getYelp = function (city) {
    const url = `https://api.yelp.com/v3/businesses/search?location=${city.formatted_query}`;

    return superagent.get(url)
        .set('Authorization', `Bearer ${process.env.YELP_API_KEY}`)
        .then(data => {
            return data.body.businesses.map(business => {
                return new Yelpful(business);
            })
        });
}

function Yelpful(business) {
    this.name = business.name;
    this.image_url = business.image_url;
    this.price = business.price;
    this.rating = business.rating;
    this.url = business.url;
}
module.exports = yelp;
