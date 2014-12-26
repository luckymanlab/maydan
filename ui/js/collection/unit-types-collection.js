var UT = window.UT || {};

UT.UnitTypesCollection = Backbone.Collection.extend({
	url: 'http://localhost:3000/unit-types',
	destroy: function() {
		this.remove(this.model);
	}
});