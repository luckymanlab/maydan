
var UT = window.UT || {};

UT.I18n = Backbone.Model.extend({
	baseURL: 'localization/',
	initialize: function(lan) {
		this.setLan(lan);
	},
	setLan: function(lan) {
		var language = lan || 'en_US';
		this.urlRoot = '' + this.baseURL + language + '.json';
		this.fetch();
	},
	//function for finding {i18n.someText} end replace it to value of language.json
	processTemplate: function(template) {
		var that = this;
		return template.replace(/{i18n\.(.+?)}/g, function(p1, p2) {
			return that.get(p2);
		});
	}
});

