/*global UT, Backbone*/
/*jshint -W079 */
var UT = window.UT || {};

/**
 * Constructor of model.
 * @constructor
 * @extends Backbone.Model
 *
 * @property {string} SUCCESS, ERROR, WARNING  - constants for classes of alert
 * @property {string} message                  - alert message
 * @property {string} classOfMessage           - alert class
 */
UT.AlertMessage = Backbone.Model.extend({
    SUCCESS: 'alert alert-success',
    ERROR: 'alert alert-danger',
    WARNING: 'alert alert-warning',
    defaults: {
        message: '',
        classOfMessage: ''
    },

    /**
     * Initialize model, set message & classOfMessage
     *
     * @param {string} text  -  text of message
     * @param {string} type  -  type of message(SUCCESS or ERROR or WARNING)
     */
    initialize: function(text, type) {
        this.message = text;
        this.classOfMessage = this[type];
    }
});
