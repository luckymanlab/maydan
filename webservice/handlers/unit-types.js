var fs = require('fs');

exports.getTypes = function(req, res) {
	fs.readFile('./data/unit-types.json', {encoding: 'utf-8'}, function(err, type) {
		if(err) {
			res.send(err);
			console.log(err);
		} else {
			res.send(JSON.parse(type));
		}
	});
}