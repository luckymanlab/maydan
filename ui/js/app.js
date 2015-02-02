/*global UT, Backbone*/

/*jshint -W079, -W117 */
var UT = window.UT || {};
//var Timeline = window.Timeline || {};

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
	UT.timer = new UT.Timer();
	UT.i18n = new UT.I18n();
    UT.auth = new UT.Auth();
    UT.facebookAuthView = new UT.FacebookAuthView();
	UT.alertMessageCollection = new UT.AlertMessageCollection();
	/* jslint nonew: false */
	new UT.ControlPanelView();
	new UT.MapView();
	new UT.AlertMessengerView({collection: UT.alertMessageCollection});
	new UT.TimelineView({model: UT.timer});
	UT.unitLoaderCollection = new UT.UnitLoaderCollection();

	/* jslint nonew: true */

    /**
     * Add Facebook AccessToken to request headers
     */
    var originalSync = Backbone.sync;
    Backbone.sync = function(method, model, options) {
        options.headers = options.headers || {};
        UT.auth.getLoginStatus(function(response) {
            _.extend(options.headers, { 'X-FB-Token': response.authResponse.accessToken});
            originalSync.call(model, method, model, options);
        });

    };
};
/**
 * Start Marionette application
 */
UT.app.start();
