/*global UT, Backbone*/
/*jshint -W079, -W117, -W031 */
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
    template: _.template('<button class="btn btn-success btn-sm create-article" id="create-article-btn">Add Unit</button>'),
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
	createArticle: function() {
        UT.facebookAuthView.doFacebookAuth(function() {
            new UT.CreateArticleView();
        });
	},

	updateArticle: function(id){
		this.articleModalView.showModal();
		this.articleModel.set('id', id);
		this.articleModel.fetch();
	},

	getAccessToken: function() {
		return $.cookie('connect.sid');
	}
});
