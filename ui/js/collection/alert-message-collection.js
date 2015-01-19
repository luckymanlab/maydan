/*global UT, Backbone*/
/*jshint -W079 */
var UT = window.UT || {};

/**
 * Constructor of collection.
 * @constructor
 * @extends Backbone.Collection
 *
 * @property {object} model   - constructor of model
 * @property {boolean} sync   - false
 */
UT.AlertMessageCollection = Backbone.Collection.extend({
    model: UT.AlertMessage,
    sync: false,

    /**
     * Create new model & push it to collection
     *
     * @param {string} text  -  text of message
     * @param {string} type  -  type of message(SUCCESS or ERROR or WARNING)
     */
    setMessage: function(text, type) {
        var that = this;
        this.push(new that.model(text, type));
    }
});
