/*jshint -W069, -W031 */
var UT = window.UT || {};

UT.MenuListCollectionView = Backbone.Marionette.CollectionView.extend({
    //collection: new UT.MenuListCollection(),
    childView: UT.MenuItemView,
    childViewContainer: 'li',
    el: '#adminMenuList',

    initialize: function(){
        this.render();
    }/*,
    renderItems: function(){
        this.collection.each(function(model) {
            new UT.MenuItemView({model:model});
        });
    }*/
});
