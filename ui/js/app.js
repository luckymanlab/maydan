var UT = window.UT || {};

UT.ApplicationView = Backbone.View.extend({
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

		//self.articleModel = new UT.Article();
		//self.articleModalView = new UT.ArticleModalView({model: self.articleModel, el:$('#article-modal')});

		self.articleModel = new UT.Article2();
		self.createArticleView = new UT.CreateArticleView({model:self.articleModel, el:$('#article-modal')});

		self.dateModel = new UT.Date();
		self.dateView = new UT.DateView({model: self.dateModel, el:$('#date-component')});
	},

	events:{
		'click #createArticle': 'createArticle'
	},
	createArticle: function(){
		this.createArticleView.showModal();
		popupFormInitialize ();
	},

	updateArticle: function(id){
		this.articleModalView.showModal();
		this.articleModel.set('id', id);
		this.articleModel.fetch();
	}
});


$(function(){
	UT.app = new UT.ApplicationView({el: $('body')});
});
