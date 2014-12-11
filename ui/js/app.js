var UT = window.UT || {};

UT.ApplicationView = Backbone.View.extend({
	/*jshint nonew: true */

	initialize: function() {
		var self = this;
		self.map = $('#map');
		//initialize route
		self.router = new UT.Router();
		self.router.on('route:editor', function(id) {
			alert(id);
		});
		Backbone.history.start();
		self.vent = _.extend({}, Backbone.Events);

		self.vent.on('incidentSelected', self.updateArticle, self);

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
		self.currentIncidentCollection = new UT.IncidentCollection();

		setInterval((function(self) {
			return function() {
				self.currentIncidentCollection.addNew(
					{
						id : (new Date()).getTime(),
						title : 'На Грушевського продовжуються протести',
						marker: 'fire',
						pos: {lat: 50.450201 + Math.random() / 1000, lon: 30.524021 + Math.random() / 1000}
					}
				);
			};
		})(self), 5000);

		self.currentIncidentCollectionView = new UT.IncidentCollectionView({model: self.currentIncidentCollection,
			map: self.map, vent: self.vent, el:$('#incident-panel')});

	},

	events:{
		'click #createArticle': 'createArticle',
		'click #authorization-btn': 'authorization'
	},
	createArticle: function(){
		/* jslint nonew: false */
		if(this.getAccessToken()) {
			console.log(this.getAccessToken());
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
		var key = 'accessToken=';
		var ca = document.cookie.split(';');
		for(var i = 0; i < ca.length; i ++) {
			var c = ca[i];
			while (c.charAt(0) === ' ') {
				c = c.substring(1);
			}
			if (c.indexOf(key) !== -1) {
				return c.substring(key.length, c.length);
			}
		}
		return '';
	}
});


$(function(){
	UT.app = new UT.ApplicationView({el: $('body')});
});
