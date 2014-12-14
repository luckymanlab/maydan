var UT = window.UT || {};

UT.UnitTypesCollection = Backbone.Collection.extend({
	url: UT.Config.getAllUnitTypes,
	destroy: function() {
		this.remove(this.model);
	}
});