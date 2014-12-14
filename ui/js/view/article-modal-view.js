var UT = window.UT || {};

UT.ArticleModalView = Backbone.View.extend({
	initialize: function(options) {
		var that = this;
		this.model = options.model;
        this.model.on('request', function () {
            that.showPreloader();
		});
        this.model.on('sync error', function () {
            that.showContent();
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