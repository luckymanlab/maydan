var myApp = new Marionette.Application();

myApp.addRegions({
    mainRegion: "#content"
});

myApp.start = function(){
    var that = this,
        articles = new UT.ArticleListCollection();
    articles.fetch({
        success: function(articles,data){
            var articleListView = new myApp.ArticleTableView({
                collection: articles
            });
            myApp.mainRegion.show(articleListView);
        }
    })
};

myApp.ArticleItemView = Marionette.ItemView.extend({
    tagName: "tr",
    template: "#row-template"
});

myApp.ArticleTableView = Marionette.CompositeView.extend({
    template: "#table-template",
    childView: myApp.ArticleItemView,
    childViewContainer: "tbody"
});
myApp.start();