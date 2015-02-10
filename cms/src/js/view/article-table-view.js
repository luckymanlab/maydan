/*jshint -W069 */
var UT = window.UT || {};

/**
 * Constructor of CompositeView
 * @constructor
 * @extends Backbone.Marionette.CompositeView
 * @property {object}  childView                - Child ItemView.
 * @property {object}  emptyView                - ItemView for empty childView.
 * @property {string}  childViewContainer       - The tag of ItemView parent element.
 */
UT.ArticleTableView = Marionette.CompositeView.extend({
    childView: UT.ArticleItemView,
    emptyView: UT.EmptyView,
    childViewContainer: 'tbody',


    /**
     * Initialize CompositeView, get template,fetch collection & render view
     */
    initialize: function(){
        $('#content').append('<div id="unapprovedArticles"></div>');
        this.$el = $('#unapprovedArticles');

        this.collection = new UT.ArticleListCollection();
        var template = window['JST']['src/templates/articles-table-template.html'](); // take template string from templates.js
        this.template = _.template(UT.i18n.processTemplate(template));
        this.render();
        this.collection.fetch();
    },

    /**
     * Rendering the childViews and adding them to the HTML
     */
    addChild: function(item, ItemView, index) {
        if (!this.children.findByModel(item)) {
            return Backbone.Marionette.CompositeView.prototype.addChild.apply(this, arguments);
        }
    }
});