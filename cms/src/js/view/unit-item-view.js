/*jshint -W069 */
var UT = window.UT || {};

UT.UnitItemView = Marionette.ItemView.extend({
    tagName: 'tr',
    events: {
        'click': 'createUnitPreview'
    },
    initialize: function(){
        var template = window['JST']['src/templates/unit-item-template.html']({unit: this.model.attributes}); // take template string from templates.js
        this.template = _.template(UT.i18n.processTemplate(template));
        this.render();
    },
    createUnitPreview: function() {
        /* jslint nonew: false */
//        new UT.ArticlePreviewView(this.model);
        /* jslint nonew: true */
    }
});
