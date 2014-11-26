var mongoose = require('../db/connect'),
    incidentTypes,typeNames =[],
    fs = require('fs'),
    date = new Date();

var incidentTypes = fs.readFileSync('db/data/incident-types.json', {encoding: 'utf-8'});
incidentTypes = JSON.parse(incidentTypes);
incidentTypes.forEach(function(type){
    typeNames.push(type.name);
});

exports.articleSchema = mongoose.Schema({
    media: String,
    incident: String
});

exports.articleTempSchema = mongoose.Schema({
    media: {
        content: { type: String, required: true }
    },
    incident: {
        time: {type: Number, min: 0, max: date.getTime()},
        incidentType: {type: String, enum: typeNames },
        coordinates: {
            lat: {type: Number, min: 0},
            lon: {type: Number, min: 0}
        }, 
        title: String
    }
});

exports.incidentSchema = mongoose.Schema({
    time: Number,
    type: String,
    coordinates: {
        lat: Number,
        lon: Number
    }, 
    title: String
});