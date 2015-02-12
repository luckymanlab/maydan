/*jshint -W069 */
var UT = window.UT || {};

/**
 * Constructor of ItemView
 * @constructor
 * @extends Backbone.Marionette.ItemView
 * @property {string}  tagName                      - tagName, where view render.
 */
UT.WaitingResponseView = Marionette.ItemView.extend({
    tagName: 'tr',

    /**
     * Initialize ItemView, get template & render view
     */
    initialize: function(){
        var template = window['JST']['src/templates/waiting-response-template.html'](); // take template string from templates.js
        this.template = _.template(UT.i18n.processTemplate(template));
    }
});