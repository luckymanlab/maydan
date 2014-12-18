var UT = window.UT || {};

UT.ApplicationView = Backbone.View.extend({
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
		if(this.getAccessToken()) {
            new UT.CreateArticleView();
    
		} else {
			this.authorization();
		}
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


$(function(){
	UT.app = new UT.ApplicationView({el: $('body')});
});
