var UT = window.UT || {};

UT.Date = Backbone.Model.extend({
	initialize: function(options) {},
	defaults: {
		'date': new Date(2013, 10, 21, 23, 30).getTime()
	},
	sync: function () { return false;},
	url: '',
	getDateString: function () {
		var d = new Date(this.get('date'));
		return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
	},
	setDate: function (d) {
		this.set('date', d.getTime())
	},
	getDate: function () {
		return new Date(this.get('date'));
	},
	getTimeString: function () {
		var d = new Date(this.get('date'));
		return + (d.getHours() < 10 ? '0' : '') + d.getHours() + ':' + (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
	},
	getDayProgress: function () {
		var d = new Date(this.get('date'));
		return 4.16 * d.getHours() + d.getMinutes() * 0.069;
	},
	setDayProgress: function (progress) {
		var h = Math.floor(progress / 4.16);
		var m = Math.floor((progress - h * 4.16) / 0.069);
		var d = new Date(this.get('date'));
		d.setHours(h);
		d.setMinutes(m);
		this.set('date', d.getTime());
	}
});

UT.Article2 = Backbone.Model.extend({
	urlRoot:'http://localhost:3000/temp/articles',
	defaults:{
		incident: new UT.Incident(),
		media: new UT.Article()
	},
	validate: function( attributes ) {
		this.validationEmptyField(attributes.incident.attributes);
		this.validationEmptyField(attributes.media.attributes);
	},
	validationEmptyField: function(model){
		for(var attr in model){
			var attrValue = model[attr];
			console.log(attrValue);
			if(attrValue == ''){
				console.log('You should enter ' + attr);
				return false;
			}
		}
	}
});