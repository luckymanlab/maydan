var UT = window.UT || {};

UT.Router = Backbone.Router.extend({
	routes: {
		'editor/*id': 'editor'
	}
});