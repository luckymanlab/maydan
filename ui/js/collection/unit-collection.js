var UT = window.UT || {};

UT.UnitCollection = Backbone.Collection.extend({
	model: UT.Unit,
	sync: function () {
        return false;
    },
	url: 'http://fcoin.com.ua:3000/incident',
	addNew: function(unit){
		this.create(unit);
	},
	removeAll: function (){
		var model;
		while (model = this.pop()){
			model.destroy();
		}
	}
});