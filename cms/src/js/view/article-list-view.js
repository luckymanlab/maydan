var myApp = new Marionette.Application();

myApp.addRegions({
    mainRegion: "#content"
});

myApp.start = function(){
    var that = this,
        articles = new UT.ArticleListCollection();
    console.log(articles);
    articles.fetch({
        success: function(articles,data){
            var articleListView = new myApp.ArticleListView({
                collection: articles
            });
            console.log("Success", data);
            myApp.mainRegion.show(articleListView);
        }
    })
};

myApp.ArticleItemView = Marionette.ItemView.extend({
    template: "#item-template",
    tagName: "li"
});
myApp.ArticleListView = Marionette.CollectionView.extend({
    tagName: 'ul',
    childView: myApp.ArticleItemView
});
myApp.start();