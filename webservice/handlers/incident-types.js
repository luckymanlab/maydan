var types = ["type1", "type2", "type3"];

exports.getTypes = function(req, res) {
	res.send(types);
}