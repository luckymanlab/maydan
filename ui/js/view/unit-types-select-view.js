/*global UT, Backbone*/
/*jshint -W079 */
var UT = window.UT || {};

/**
Constructor of ItemView
 @constructor
 @extends Backbone.Marionette.ItemView
 @property {string}  el                       - The id of ItemView parent element.
 @property {object}  collection               - The collection of ItemView.
 @property {object}  events                   - The events of CompositeView.
*/
UT.UnitTypeSelectView = Backbone.Marionette.ItemView.extend({
    el: '#unit-type-select-container',
    collection: new UT.UnitTypesCollection(),
    events: {
        'click #mainSelectUnitType': 'showOptions',
        'click .select-option': 'selectOption'
    },

    /**
     * Initialize ItemView, get template & render view
     */
    initialize: function() {
        var that = this;
        $.get(UT.Config.unitTypesTemplate, function(data) {
            that.collection.fetch({
                success: function(result) {
                    that.collection.models.forEach(function(model){
                        model.attributes.imageSrc = UT.Config.imagePath.replace('{ITEM_TYPE}', model.attributes.type);
                    });
                    that.template = _.template(UT.i18n.processTemplate(data));
                    that.render();
                }
            });
        });
    },

    /**
     * Show option in custom select
     * @param {obj} ev current event
     */
    showOptions: function(ev) {
        this.$('#optionsUnitType').toggle();
    },

    /**
     * Set value from custom option to hidden input
     * @param {obj} ev current event
     */
    selectOption: function(ev) {
        var typeName = $(ev.currentTarget).find('.unit-type-name').text();
        this.$('#selectedValue').text(typeName).removeClass('placeholder');
        this.$('#optionsUnitType').toggle();
        $('#hiddenUnitType').attr('value', typeName);
    },

    /**
     * Destroy view
     */
    onDestroy: function() {
        this.$el.remove();
        this.model.destroy();
        this.remove();
    }
});