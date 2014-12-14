var UT = window.UT || {};

UT.Unit = Backbone.Model.extend({
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