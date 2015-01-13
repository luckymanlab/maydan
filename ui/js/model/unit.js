var UT = window.UT || {};

UT.Unit = Backbone.Model.extend({
    initialize: function() {},
    sync: function () { return false;},
    clear: function() {
        this.destroy();
    },
    getPos: function() {
        return this.get('coordinates');
    },
    getTitle: function() {
        return this.get('title');
    },
	defaults: {
		time: '',
		coordinates: {
			lat: '',
			lon: ''
		},
		title:''
	}
});