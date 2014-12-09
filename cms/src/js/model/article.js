var UT = window.UT || {};
UT.Article = Backbone.Model.extend({
    idAttribute: '_id',
    defaults: {
        incident: new UT.Incident(),
        media: new UT.Media(),
        criationDate: ''
    },
    confirm: function(callback) {
        this.set('type', 'confirm');
        Backbone.sync('update', this);
        this.collection.remove(this);
    }
});