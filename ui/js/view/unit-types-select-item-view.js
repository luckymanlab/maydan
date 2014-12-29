/*global UT, Backbone*/
/*jshint -W079 */
var UT = window.UT || {};

/**
Constructor of ItemView
@constructor
@extends Backbone.Marionette.ItemView
*/
UT.UnitTypeSelectItemView = Backbone.Marionette.ItemView.extend({
    el: '#unit-type-select-container',
    collection: new UT.UnitTypesCollection(),
    events: {
        'click #mainSelectUnitType': 'showOptions',
        'click .select-option': 'selectOption'
    },
    initialize: function() {
        var that = this;
        $.get('templates/unit-types-select-template.html', function(data) {
            that.collection.fetch({
                success: function() {
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