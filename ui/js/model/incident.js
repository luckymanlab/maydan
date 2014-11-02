var UT = window.UT || {};

UT.Incident = Backbone.Model.extend({
	initialize: function() {},
	sync: function () { return false;},
	url: '',
	clear: function() {
		this.destroy();
	},
	getPos: function() {
		return this.get('pos');
	},
	getTitle: function() {
		return this.get('title');
	}
});