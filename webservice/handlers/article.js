var mongoose = require('../connect'),
    temp = require('./article-temp'),
    models = require('../models.js');

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