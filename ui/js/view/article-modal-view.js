var UT = window.UT || {};

UT.ArticleModalView = Backbone.View.extend({
	initialize: function(options) {
		var self = this;
		self.model = options.model;
		self.model.on('request', function () {
			self.showPreloader();
		});
		self.model.on('sync error', function () {
			self.showContent();
		});
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
	}
});








