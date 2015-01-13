var UT = window.UT || {};

UT.UnitCollection = Backbone.Collection.extend({
	model: UT.Unit,
	url: 'http://localhost:3000/unit'
});