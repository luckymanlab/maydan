var UT = window.UT || {};

UT.ArticleItemView = Marionette.ItemView.extend({
    tagName: 'tr',
    template: '#row-template',
    events: {
        'click .delete-item': 'destroyItem',
        'click .confirm-item': 'confirmItem'
    },
    destroyItem: function(ev) {
        this.model.destroy();
    },
    confirmItem: function(ev) {
        this.model.confirm();
    }
});