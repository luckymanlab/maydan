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

    emptyView: UT.WaitingResponseView,
    childViewContainer: 'tbody',


    /**
     * Initialize CompositeView, get template,fetch collection & render view
     */
    initialize: function(options){
        var that = this;
        var template;
        var successMsg = '';
        var current = options.current;
        $('#content').append('<div id="articlesTable"></div>');
        this.$el = $('#articlesTable');

        if(current === 0) {
            this.childView = UT.ArticleItemView;
            this.collection = new UT.ArticleListCollection();
            successMsg = '{i18n.NO_ARTICLES}';
            template = window['JST']['src/templates/articles-table-template.html']();

        } else if(current === 1){
            this.childView = UT.UnitItemView;
            this.collection = new UT.UnitListCollection();
            successMsg = '{NO_UNITS}';
            template = window['JST']['src/templates/unit-table-template.html']();
        }

        this.template = _.template(UT.i18n.processTemplate(template));
        this.render();
        this.collection.fetch({
            success: function (resp) {
                that.emptyView = UT.EmptyView;
                that.emptyViewOptions = {msg: successMsg};
                if (resp.models.length === 0) {
                    that.render();
                }
            }
        });
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