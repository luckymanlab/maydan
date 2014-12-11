var UT = window.UT || {};

UT.ArticleItemView = Marionette.ItemView.extend({
    tagName: 'tr',
    template: '#row-template',
    events: {
        'click': 'createArticlePreview'
    },
    createArticlePreview: function() {
        new UT.ArticlePreviewView(this.model);              
    },    
});
