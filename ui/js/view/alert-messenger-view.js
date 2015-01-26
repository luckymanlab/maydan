/*global UT, Backbone*/
/*jshint -W079, -W069 */
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
     * Initialize CollectionView
     */
    initialize: function(option) {
        this.collection = option.collection;
        this.render();
    }
});
