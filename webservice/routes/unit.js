var unit = require('../handlers/unit');

exports.setRoutes = function(router) {
    router.route('/unit')
        .get(function(req, res){
            if(req.query.startDate || req.query.endDate){
                unit.getByRange(req, res);
            } else{
                unit.getAll(req, res);
            }
        })
        .post(unit.addUnit);

    router.get('/unit/:id', unit.getById);
}