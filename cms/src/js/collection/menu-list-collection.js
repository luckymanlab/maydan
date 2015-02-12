var UT = window.UT || {};

UT.MenuListCollection = Backbone.Collection.extend({
    model: UT.AdminMenuItem,
    url: ''
});