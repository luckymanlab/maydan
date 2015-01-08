/*global UT, Backbone*/
/*jshint -W079 */
var UT = window.UT || {};

/**
 * Constructor of ItemView
 * @constructor
 * @extends Backbone.Marionette.ItemView
 * @property {object}  template              - template of view.
 * @property {string}  el                    - Parent element of view
 * @property {object}  events                - The events of ItemView.
 */
UT.ControlPanelView = Backbone.Marionette.ItemView.extend({
    el: '#control-panel',
    template: _.template('<button class="btn btn-primary btn-lg" id="create-article-btn">Add Unit</button>'),
    events:{
		'click #create-article-btn': 'createArticle'
	},

    /**
     * Initialize ItemView, render view
     */
    initialize: function() {
        this.render();
    },

	/**
	 * Create view for creating new article
	 */
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
