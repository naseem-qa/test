  `use strict`

const superagent = require('superagent')

let events = {}

events.getEvent = function(query) {
    const url = `http://api.eventful.com/json/events/search?app_key=${process.env.EVENTFUL_API_KEY}&location=${query.formatted_query}`;

    return superagent.get(url)
        .then(data => {
            const eventful = JSON.parse(data.text);
            return eventful.events.event.map((eventday) => {
                return new Eventful(eventday);
            });
        });
}

function Eventful(eventday) {
    this.link = eventday.url;
    this.name = eventday.title;
    this.event_data = eventday.start_time;
    this.summary = eventday.description;
}
module.exports = events;
