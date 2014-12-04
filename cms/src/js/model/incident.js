var UT = window.UT || {};

UT.Incident = Backbone.Model.extend({
	defaults: {
		time: '',
		type: '',
		coordinates: {
			lat: '',
			lon: ''
		},
		title:''
	}
});