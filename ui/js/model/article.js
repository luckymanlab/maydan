var UT = window.UT || {};

UT.Article = Backbone.Model.extend({
	initialize: function() {},
	//sync: function () { return false;},
	urlRoot: '/article',
	clear: function() {
		this.destroy();
	},
	defaults: {
		content: ''
	}
});
