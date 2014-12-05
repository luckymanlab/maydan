var UT = window.UT || {};

UT.app = new Marionette.Application();

UT.app.start = function(){
    this.articleTableView = new UT.ArticleTableView();
};

UT.app.start();