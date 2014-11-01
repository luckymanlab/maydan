var UT = window.UT || {};

UT.Incident = Backbone.Model.extend({
	initialize: function() {},
	sync: function () { return false;},
	url: '',
	clear: function() {
		this.destroy();
	}
});