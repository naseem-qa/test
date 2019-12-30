DROP TABLE IF EXISTS locations;
CREATE TABLE locations
(
    id SERIAL PRIMARY KEY,
    formatted_query VARCHAR(255),
    display_name VARCHAR(255),
    latitude FLOAT,
    longitude FLOAT
);
