var UT = window.UT || {};

UT.app = new Marionette.Application();

UT.app.start = function(){
    UT.i18n = new UT.I18n();
    console.log(UT.Config);
    UT.i18n.fetch({
        success: function(){
            this.articleTableView = new UT.ArticleTableView();
        }
    });
};

UT.app.start();