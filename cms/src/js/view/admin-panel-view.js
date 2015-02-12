/*jshint -W069, -W089, -W117 */
var UT = window.UT || {};

UT.AdminPanelView = Backbone.Marionette.CompositeView.extend({
    childView: UT.MenuItemView,
    childViewContainer: 'ul#adminMenuList',
    el: '#adminPanel',
    childEvents: {
        'changeCurrentMenuItem': function(view) {
            if(+this.model.getCurrentMenuItem() !== +view.model.attributes.id) {
                this.model.setCurrentMenuItem(view.model.attributes.id);
                this.collection.menuCurrent = view.model.attributes.id;
                this.render();
            }

        }
    },
    events:{
        'click #logoutButton': 'logout'
    },

    /**
     * Initialize CompositeView, get template,fetch collection & render view
     */
    initialize: function(options){
        var that = this;
        this.model = options.menuModel;
        this.collection = options.collection;
        this.collection.menuCurrent = this.model.getCurrentMenuItem();
        FB.api('/me', function(response) {
            var template = window['JST']['src/templates/admin-panel-template.html']({panel: that.model.attributes, user: response}); // take template string from templates.js
            that.template = _.template(UT.i18n.processTemplate(template));
            that.render();
        });


    },
    logout: function() {
        FB.logout(function(resp) {
            if(resp.status !== 'connected') {
                UT.auth.statusLoginOff();
            }
        });
    }
    /**
     * Rendering the childViews and adding them to the HTML
     */
//    addChild: function(item, ItemView, index) {
//        if (!this.children.findByModel(item)) {
//            return Backbone.Marionette.CompositeView.prototype.addChild.apply(this, arguments);
//        }
//    }
});