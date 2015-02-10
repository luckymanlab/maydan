/*jshint -W069, -W031 */
var UT = window.UT || {};

UT.AdministrationView = Backbone.Marionette.ItemView.extend({
    el: '#main',

    initialize: function(){
        this.model = new UT.AdminPanelMenu();
        this.model.attributes.projectName = UT.Config.projectName;
        var that = this;
        this.model.on('change:current', function() {
            that.changeCurrentMenuItem();
        });
        var menuItemCollection = new UT.MenuListCollection(this.model.getMenuList());
        new UT.AdminPanelView({menuModel: this.model, collection: menuItemCollection});

        this.currentContentView = new UT.ArticleTableView();
    },
    changeCurrentMenuItem: function() {
        console.log('change!', this.model.getCurrentMenuItem());
        this.currentContentView.destroy();
        if(+this.model.getCurrentMenuItem() === 0) {
            this.currentContentView = new UT.ArticleTableView();
        }
    }

});