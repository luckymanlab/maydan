var mongoose = require('../connect'),
    models = require('../models.js'),
    temp = require('./article-temp');

exports.getAll = function(req, res) {
    models.article.find(function(err, data) {
        if(err) {
            console.log(err);
            res.send(err);
        } else {
            res.send(data);
        }
    });
};

exports.getById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving article: ' + id);
    models.article.find({_id: id}, function(err, data) {
        if(err) {
            console.log(err);
            res.send(err);
        } else {
            res.send(data);
        }
    });
};

exports.temp = temp;