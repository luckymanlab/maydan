/*global UT, Backbone*/
/*jshint -W079 */
var UT = window.UT || {};

/**
 * Constructor of CollectionView
 * @constructor
 * @extends Backbone.Marionette.CollectionView
 * @property {string}  el                      - ID of parent DOM element, where view render.
 * @property {object}  childView               - constructor of childView
 */
UT.AlertMessengerView = Backbone.Marionette.CollectionView.extend({
    el: '#alertMessenger',
    childView: UT.AlertMessageView,

    /**
     * Initialize CollectionView, get collection from options, get template & send it to childViewOptions
     *
     * @param {object} option  -  option has property collection, it's collection for CollectionView
     */
    initialize: function(option) {
        var that = this;
        this.collection = option.collection;
        $.get(UT.Config.alertTemplate, function(data) {
            that.childViewOptions = {
                templ: data
            };
            that.render();
        });
    }
});
