/*jshint -W069 */
var UT = window.UT || {};

/**
 * Constructor of ItemView
 * @constructor
 * @extends Backbone.Marionette.ItemView
 * @property {string}  tagName                      - tagName, where view render.
 */
UT.EmptyView = Marionette.ItemView.extend({
    tagName: 'tr',

    /**
     * Initialize ItemView, get template & render view
     */
    initialize: function(){
        var template = window['JST']['src/templates/no-articles-template.html'](); // take template string from templates.js
        this.template = _.template(UT.i18n.processTemplate(template));
    }
});