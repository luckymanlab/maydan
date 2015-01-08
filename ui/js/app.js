/*global UT, Backbone*/
/*global Timeline, Timeline*/
/*jshint -W079 */
var UT = window.UT || {};
var Timeline = window.Timeline || {};

/**
 * Create instance of the Backbone.Marionette.Application
 */
UT.app = new Backbone.Marionette.Application();
/**
 * Create for start application
 */
UT.app.start = function(){
	this.router = new UT.Router();
	this.router.on('route:editor', function(id) {
		alert(id);
	});
	Backbone.history.start();
	UT.i18n = new UT.I18n();
	/* jslint nonew: false */
	new UT.ControlPanelView();
	new UT.MapView();
	/* jslint nonew: true */
	Timeline.core.init($('.time-block'), Timeline.Config);
};
/**
 * Start Marionette application
 */
UT.app.start();
