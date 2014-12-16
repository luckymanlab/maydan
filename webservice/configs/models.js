var mongoose = require('./connect'),
    unitTypes,
    typeNames =[],
    fs = require('fs'),
    date = new Date();

var unitTypes = fs.readFileSync('./data/unit-types.json', {encoding: 'utf-8'});
unitTypes = JSON.parse(unitTypes);
unitTypes.forEach(function(type){
    typeNames.push(type.name);
});

var articleSchema = mongoose.Schema({
    media: String,
    unit: String
});

var unitSchema = mongoose.Schema({
    _id: String,
    time: Number,
    unitType: String,
    coordinates: {
        lat: Number,
        lon: Number
    }, 
    title: String
});

var mediaSchema = mongoose.Schema({
    content: {type: String, required: true}
});

var articleTempSchema = mongoose.Schema({
    criationDate: {
        type: Number,
        default: date.getTime()
    },
    media: {
        content: { type: String, required: true }
    },
    unit: {
        time: {type: Number, min: 0, max: date.getTime()},
        unitType: {type: String, enum: '' },
        coordinates: {
            lat: {type: Number, min: 0},
            lon: {type: Number, min: 0}
        }, 
        title: String
    }
});

exports.article = mongoose.model('article', articleSchema);
exports.unit = mongoose.model('unit', unitSchema);
exports.media = mongoose.model('media', mediaSchema);
exports.articleTemp = mongoose.model('articleTemp', articleTempSchema);