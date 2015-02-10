/*jshint -W069, -W089 */
var UT = window.UT || {};

UT.AdminPanelView = Backbone.Marionette.CompositeView.extend({
    childView: UT.MenuItemView,
    childViewContainer: 'ul',
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

    /**
     * Initialize CompositeView, get template,fetch collection & render view
     */
    initialize: function(options){
        this.model = options.menuModel;
        this.collection = options.collection;
        this.collection.menuCurrent = this.model.getCurrentMenuItem();

        var template = window['JST']['src/templates/admin-panel-template.html']({panel: this.model.attributes}); // take template string from templates.js
        this.template = _.template(UT.i18n.processTemplate(template));
        this.render();

    },
    /**
     * Rendering the childViews and adding them to the HTML
     */
    addChild: function(item, ItemView, index) {
        if (!this.children.findByModel(item)) {
            return Backbone.Marionette.CompositeView.prototype.addChild.apply(this, arguments);
        }
    }
});