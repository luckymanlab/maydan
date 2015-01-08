var UT = window.UT || {};

UT.Router = Backbone.Marionette.AppRouter.extend({
	routes: {
		'editor/*id': 'editor'
	}
});