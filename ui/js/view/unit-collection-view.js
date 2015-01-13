/*jshint -W098, -W031 */
var UT = window.UT || {};

UT.UnitCollectionView = Backbone.Marionette.CollectionView.extend({
    collection: new UT.UnitCollection(),
    childView: UT.UnitMapView,
    /**
     * Initialize Units on the map
     */
	initialize: function(map) {
        var that = this;
        this.map = map;
        this.collection.fetch({
            success: function () {
                that.collection.each(function(unit) {
                    new UT.UnitMapView({map: that.map, model: unit});
                });
            }
        });
	}
});