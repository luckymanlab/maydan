var UT = window.UT || {};

UT.Media = Backbone.Model.extend({
	initialize: function() {},
	urlRoot: '/article',
	clear: function() {
		this.destroy();
	},
	defaults: {
		content: ''
	}
});
