/*jshint -W069 */
var UT = window.UT || {};

UT.MenuItemView = Backbone.Marionette.ItemView.extend({
    tagName: 'li',
    triggers: {
        'click': 'changeCurrentMenuItem'
    },
    initialize: function() {
        var currentItem = this.model.collection.menuCurrent;
        var template = window['JST']['src/templates/menu-item-template.html']({li: this.model.attributes}); // take template string from templates.js
        this.template = _.template(UT.i18n.processTemplate(template));

        if(+this.model.attributes.id === +currentItem) {
            this.$el.addClass('active');
        }

        this.render();
    }




});
