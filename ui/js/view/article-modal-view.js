var UT = window.UT || {};

UT.ArticleModalView = Backbone.View.extend({
	initialize: function(options) {
		this.showContent();
		this.createArticleView = new UT.CreateArticleView ({el: $('.content')});
		this.createArticleView.show();
	},
	events:{
		'click #articleModal': 'articleModal',
		'click #closeModal': 'closeModal'
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








