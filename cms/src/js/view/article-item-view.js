/*jshint -W069 */
var UT = window.UT || {};

UT.ArticleItemView = Marionette.ItemView.extend({
    tagName: 'tr',
    events: {
        'click': 'createArticlePreview'
    },
    initialize: function(){
        var template = window['JST']['src/templates/article-item-template.html']({article: this.model.attributes}); // take template string from templates.js
        this.template = _.template(UT.i18n.processTemplate(template));
        this.render();
    },
    createArticlePreview: function() {
        /* jslint nonew: false */
        new UT.ArticlePreviewView(this.model);
        /* jslint nonew: true */
    }
});
