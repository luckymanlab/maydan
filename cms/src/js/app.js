var UT = window.UT || {};

UT.app = new Marionette.Application();

UT.app.start = function(){
    UT.i18n = new UT.I18n();
    this.articleTableView = new UT.ArticleTableView();
};

UT.app.start();