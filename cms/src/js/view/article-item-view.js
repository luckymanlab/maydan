var UT = window.UT || {};

UT.ArticleItemView = Marionette.ItemView.extend({
    tagName: 'tr',
    template: '#row-template',
    events: {
        'click .delete-item': 'destroyItem',
        'click .confirm-item': 'confirmItem'
    },
    destroyItem: function(event) {
        this.model.destroy();
    },
    confirmItem: function(event) {
        this.model.confirm();
    }
});
