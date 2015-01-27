/*jshint -W069 */
var UT = window.UT || {};

UT.ArticleTableView = Marionette.CompositeView.extend({
    childView: UT.ArticleItemView,
    childViewContainer: 'tbody',
    el: '#content',
    initialize: function(){
        this.collection = new UT.ArticleListCollection();
        var template = window['JST']['src/templates/articles-table-template.html'](); // take template string from templates.js
        this.template = _.template(UT.i18n.processTemplate(template));
        this.render();
        this.collection.fetch();
    },
    addChild: function(item, ItemView, index) {
        if (!this.children.findByModel(item)) {
            return Backbone.Marionette.CompositeView.prototype.addChild.apply(this, arguments);
        }
    }
});