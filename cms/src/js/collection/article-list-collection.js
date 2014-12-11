var UT = window.UT || {};

UT.ArticleListCollection = Backbone.Collection.extend({
    model: UT.Article,
    url: UT.Config.getAllArticles
});