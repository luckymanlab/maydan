var UT = window.UT || {};

UT.IncidentCollection = Backbone.Collection.extend({
	model: UT.Incident,
	sync: function () { return false;},
	url: 'http://fcoin.com.ua:3000/incident',
	addNew: function(incident){
		this.create(incident);
	},
	removeAll: function (){
		var model;
		while (model = this.pop()){
			model.destroy();
		}
	}
});