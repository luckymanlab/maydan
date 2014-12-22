/*global UT, Backbone */
/*jshint -W079 */
var UT = window.UT || {};

/**
    Constructor of model.
    @constructor
    @extends Backbone.Model
*/
UT.I18n = Backbone.Model.extend({
    baseURL: 'localization/',
    initialize: function(lan) {
        this.setLan(lan);
    },
    /**
     * Set urlRoot form json file end baseURL
     * @param {string} lan name of json file
     */
    setLan: function(lan) {
        var language = lan || 'en_US';
        this.urlRoot = '' + this.baseURL + language + '.json';
        this.fetch();
    },
    /**
     * Replace template data to localized properties of model
     *
     * @param {string} template that must be changed
     * @deprecated
     * @return {string} changed template
     */
    processTemplate: function(template) {
        var that = this;
        return template.replace(/{i18n\.(.+?)}/g, function(p1, p2) { // /{i18n\.(.+?)}/ === {i18n.someText}
            return that.get(p2);
        });
    }
});
