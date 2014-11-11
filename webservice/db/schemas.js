var mongoose = require('../db/db-configs'),
    date = new Date();

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
        incidentType: {type: String, enum: ['']},
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