var UT = window.UT || {};

UT.IncidentTypesCollection = Backbone.Collection.extend({
	url: UT.Config.getAllIncidentTypes
});