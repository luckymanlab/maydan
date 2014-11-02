var UT = window.UT || {};

UT.IncidentListView = Backbone.View.extend({

	initialize: function(options) {
		this.model.on('remove', this.remove, this);
		this.render();
	},

	render: function() {
		this.setElement('<li class="list-group-item">' + this.model.get('title') + '</li>');
		return this;
	},

	remove: function() {
		this.$el.html('');
	}
});