var fs = require('fs'),
	path = require('path')

exports.getTypes = function(req, res) {
	fs.readFile(path.normalize(__dirname + '/../db/data/incident-types.json'), {encoding: 'utf-8'}, function(err, type) {
		if(err) throw err
		res.send(type);
	});
}