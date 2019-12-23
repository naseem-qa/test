'use strict';
 require('dotenv').config();

 const express = require('express');
 const cors = require('cors');
 const PORT =process.env.PORT;
 const app =express();

app.get('/location',locationHandler);

function locationHandler(req,res){
    let locationData = getLocation();
    res.status(200).json(locationData);
}

function getLocation(){
    let data = require('./data/geo.json');
    return new Location (data);
}

function Location(data){
    this.search_query='';
    this.formatted_query=data.results[0].formatted_address;
    this.latitude=data.results[0].geometry.location.lat;
    this.longitude=data.results[0].geometry.location.lng;
}

app.use('*',(req,res)=>{
  res.status(404).send('not found')  
});

 app.use(cors());
 app.listen(PORT,()=>console.log(`app listen to ${PORT}`));