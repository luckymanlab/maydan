var UT = window.UT || {};

UT.UnitListCollection = Backbone.Collection.extend({
    model: UT.Unit,
    url: UT.Config.getApprovedArticles
});