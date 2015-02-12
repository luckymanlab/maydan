var UT = window.UT || {};

UT.Unit = Backbone.Model.extend({
    sync: function () { return false;},
    getUnitPos: function() {
        return this.get('coordinates');
    },
    getUnitTitle: function() {
        return this.get('title');
    },
    getUnitType: function() {
        return this.get('unitType');
    },
    getUnitId: function() {
        return this.get('id');
    },
	defaults: {
		time: '',
        unitType: '',
		coordinates: {
			lat: '',
			lon: ''
		},
		title:''
	}
});