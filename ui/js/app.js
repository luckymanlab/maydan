/*global UT, Backbone*/
/*jshint -W079 */
var UT = window.UT || {};

/**
 Constructor of View
 @constructor
 @extends Backbone.Marionette.View
 */
UT.ApplicationView = Backbone.Marionette.View.extend({
	/*jshint nonew: true */
	initialize: function() {
		var that = this;
		this.map = $('#map');
		//initialize route
        this.router = new UT.Router();
        this.router.on('route:editor', function(id) {
			alert(id);
		});
		Backbone.history.start();
        this.vent = _.extend({}, Backbone.Events);

        this.vent.on('unitSelected', that.updateArticle, that);

		//initialize map
		var center = new google.maps.LatLng(50.450201, 30.524021);
		var styles = [
			{
				elementType: 'geometry',
				stylers: [
					{ saturation: -80 }
				]
			}
		];

		var mapOptions = {
			zoom: 18,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			center: center,
			styles: styles
		};
		this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
		UT.i18n = new UT.I18n();
	},

	events:{
		'click #create-article-btn': 'createArticle'
	},
	createArticle: function(){
		/* jslint nonew: false */
		new UT.CreateArticleCompositeView();
		/* jslint nonew: true */
	},
	authorization: function() {
		window.open('http://localhost:3000/auth/facebook', '_blank', 'width=600, height=500');
	},
	updateArticle: function(id){
		this.articleModalView.showModal();
		this.articleModel.set('id', id);
		this.articleModel.fetch();
	},
	getAccessToken: function() {
		return $.cookie('accessToken');
	}
});

/**
 * Create instance of the Backbone.Marionette.Application
 */
UT.app = new Backbone.Marionette.Application();
/**
 * Create instance of the UT.ApplicationView
 */
UT.app.start = function(){
	this.applicationView = new UT.ApplicationView({el: $('body')});
};
/**
 * Start Marionette application
 */
UT.app.start();
