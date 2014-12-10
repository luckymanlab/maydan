var UT = window.UT || {};

UT.IncidentCollectionView = Backbone.View.extend({

	//el:  $("#companies_holder"),

	initialize: function(options) {
		this.map = options.map;
		this.vent = options.vent;
		this.model.on('add', this.incidentAddHandler, this);

		//initialize position
		/*this.$el.css({display: 'none', right:'20px', top: '120px'}, 2000);
		this.$el.fadeIn('500');

		this.list_container = $('#companies_list_holder ul', this.$el);*/

		this.render();
	},

	incidentAddHandler : function (incident){
//		var marker_view = new UT.IncidentMapView({model: incident, map: this.map, vent: this.vent});
		var item_view = new UT.IncidentListView({model: incident});
		this.$el.append(item_view.render().el);
	},

	//---------------------------------------
	// Render all
	//---------------------------------------
	render: function() {
		this.model.each (this.incidentAddHandler, this);
	}
});