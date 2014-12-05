var UT = window.UT || {};

UT.ArticleTableView = Marionette.CompositeView.extend({
    template: "#table-template",
    childView: UT.ArticleItemView,
    childViewContainer: "tbody",
    el: "#content",
    initialize: function(){
        var that = this;
        this.collection = new UT.ArticleListCollection();
        this.collection.bind('change add remove reset', function(){
            that.render();
        });
        this.collection.fetch();
    }
});