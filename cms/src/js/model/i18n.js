/*global UT, Backbone */
/*jshint -W079 */
var UT = window.UT || {};

/**
    Constructor of model.
    @constructor
    @extends Backbone.Model
*/
UT.I18n = Backbone.Model.extend({
    /**
     * Initialize Model
     * @param {string} locale name of json file
     */
    initialize: function(locale) {
        this.setLan(locale);
    },

    /**
     * Set urlRoot form json file end baseURL
     * @param {string} locale name of json file
     */
    setLan: function(locale) {
        var currentLocale = locale || UT.Config.localeDefault;
        this.urlRoot = UT.Config.localeBaseURL + currentLocale + '.json';
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
        return template.replace(/{i18n\.(.+?)}/g, function(foundPhrase, propertyOfFoundPhrase) { // /{i18n\.(.+?)}/ === {i18n.someText}
            return that.get(propertyOfFoundPhrase);
        });
    }
});
