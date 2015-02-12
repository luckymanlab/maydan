/*jshint -W069, -W031 */
var UT = window.UT || {};

UT.AdministrationView = Backbone.Marionette.ItemView.extend({

    initialize: function(){
        $('#main').append('<div id="body"><div id="adminPanel" class="col-sm-12"></div><div id="content" class="col-sm-12 container"></div></div>');
        this.$el = $('#body');
        this.model = new UT.AdminPanelMenu();
        this.model.attributes.projectName = UT.Config.projectName;
        var that = this;
        this.model.on('change:current', function() {
            that.changeCurrentMenuItem();
        });
        var menuItemCollection = new UT.MenuListCollection(this.model.getMenuList());
        new UT.AdminPanelView({menuModel: this.model, collection: menuItemCollection});

        this.currentContentView = new UT.ArticleTableView({current: this.model.attributes.current});
    },
    changeCurrentMenuItem: function() {
        this.currentContentView.destroy();
        this.currentContentView = new UT.ArticleTableView({current: this.model.attributes.current});

    }

});