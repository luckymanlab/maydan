var UT = window.UT || {};

UT.ArticleTableView = Marionette.CompositeView.extend({
    childView: UT.ArticleItemView,
    childViewContainer: 'tbody',
    el: '#content',
    initialize: function(){
        var that = this;
        this.collection = new UT.ArticleListCollection();
        $.get(UT.Config.articlesTableTemplate, function(data) {
            that.template = _.template(UT.i18n.processTemplate(data));
            that.render();
        });
        this.collection.fetch();
    },
    addChild: function(item, ItemView, index) {
        if (!this.children.findByModel(item)) {
            return Backbone.Marionette.CompositeView.prototype.addChild.apply(this, arguments);
        }
    }
});