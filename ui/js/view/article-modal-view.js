var UT = window.UT || {};

UT.ArticleModalView = Backbone.View.extend({
	initialize: function(options) {
		this.showContent();
		this.createArticleView = new UT.CreateArticleView ({el: $('.content')});
		//var self = this;
		//self.model = options.model;
		//self.model.on('request', function () {
		//	self.showContent();
		//});
		//self.model.on('sync error', function () {
		//	self.showContent();
		//});
	},
	events:{
		'click #articleModal': 'articleModal',
		'click #closeModal': 'closeModal'
	},
	articleModal: function(){
		console.log('It works');
		this.createArticleView.show();
	},
	showModal: function () {
		this.$el.modal('show');
	},
	showPreloader: function () {
		this.$el.find('.preloader').show();
		this.$el.find('.content').hide();
	},
	showContent: function () {
		this.$el.find('.preloader').hide();
		this.$el.find('.content').show();
	},
	closeModal: function(e){
		e.preventDefault();
		console.log("Something");
		this.createArticleView.cancelArticle();
	}
});

UT.CreateArticleView = Backbone.View.extend({
	initialize: function(){
		this.model = new UT.Article2();
	},
	render: function(){
		var that = this;
		//var template=_.template(createIncidentTemplate.createIncidentTemplate);
		//that.$el.html(template);
		$.get('js/templates/createArticleTemplate.html', function (data) {
			var template=_.template(data); //Option to pass any dynamic values to template
			that.$el.html(template); //adding the template content to the main template.
		}, 'html');
	},
	events: {
		'click #saveArticle': 'saveArticle',
		'click #cancel': 'cancelArticle'
	},
	show: function () {
		this.render();
		this.$el.show();
	},
	saveArticle: function(e){
		e.preventDefault();
		var c = this.model.get('incident');
		console.log(c);
		this.model.get('incident').set({time: incidentTime.value, marker: coordLat.value, coordinates:coordLon.value});
		this.model.get('media').set({content: mediaName.value});
		var model = this.model;
		console.log(model);
		this.model.save({}, {
			dataType: 'text',
			success: function (model, response, options) {
				console.log("The model has been saved to the server" , response, model);
			},
			error: function (model, xhr, options) {
				console.log("Something went wrong while saving the model");
			}
		});
	},
	cancelArticle: function(){
		this.checkFilledFields();
	},
	checkFilledFields:function(){
		var filled  = $('input:text').filter(function(){
			return $.trim(this.value) != ''
		});
		if(filled.length)
		{
			console.log("Not Empty!");
			alert("Are you sure?");
			return;
		}
	}
});
