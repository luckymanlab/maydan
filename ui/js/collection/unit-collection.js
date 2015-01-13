var UT = window.UT || {};

UT.UnitCollection = Backbone.Collection.extend({
	model: UT.Unit,
	url: UT.Config.getAllApprovedUnits
});