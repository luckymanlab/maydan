/*global UT, Backbone*/
/*jshint -W079 */
var UT = window.UT || {};

/**
 * Constructor of ItemView
 * @constructor
 * @extends Backbone.Marionette.ItemView
 * @property {string}  tagName                - Tag name of views template .
 * @property {string}  className              - Class of tag name.
 */
UT.AlertMessageView = Backbone.Marionette.ItemView.extend({
    tagName: 'div',
    className: function() {
        return this.model.classOfMessage;
    },

    /**
     * Initialize ItemView, get template from options & process it
     */
    initialize: function(option) {
        var item = this.model;
        this.template = _.template(option.templ)({
            item: item
        });
    },

    onRender: function() {
        this.animateDestroying();
    },

    onDestroy: function() {
        this.model.destroy();
    },

    /**
     * Initialize CompositeView, get template & render view
     */
    animateDestroying: function() {
        var that = this;
        this.$el.animate({
            opacity: 0
        }, 5000, function() {
            that.destroy();
        });
    }
});
