var UT = window.UT || {};

UT.IncidentMapView = Backbone.View.extend({

	initialize: function(options) {
		var self = this;

		self.model = options.model;
		self.model.on('remove', self.remove, self);
		self.map = options.map;
		self.vent = options.vent;
		var pos = self.model.get('pos');

		self.marker = new google.maps.Marker({
			map: self.map,
			position: new google.maps.LatLng(pos.lat, pos.lon),
			animation: google.maps.Animation.DROP,
			title: self.model.get('title'),
			icon: 'public/img/markers/' + self.model.get('marker') + '.png',
			id : self.model.get('id')
		});

		self.content = $('<div><h6>' + self.model.get('title') + '</h6><img style="width:100%" src="http://images7.unian.net/photos/2014_01/1390164176-7127.jpeg" /></div>')

		self.infoBubble = new InfoBubble({
			maxWidth: 150,
			minHeight: 20,
			content: self.content[0]
		});

		google.maps.event.addListener(self.marker, 'click', function(){
			self.markerClick(self);
		});

		setTimeout(function(){
			self.infoBubble.open(self.map, self.marker);
			self.infoBubble.hideCloseButton();
			self.infoBubble.setZIndex(self.marker.getZIndex());
			google.maps.event.addDomListener(self.content[0], 'click', function(){
				self.markerClick(self);
			});
		}, 2000);
	},

	markerClick: function (self){
		self.vent.trigger('incidentSelected', self.model.get('id'));
		self.marker.setZIndex(google.maps.Marker.MAX_ZINDEX + 1);
		self.infoBubble.setZIndex(google.maps.Marker.MAX_ZINDEX + 2);
	},

	render: function() {},

	remove : function(){
		this.marker.setMap(null);
		this.marker = null;
	}
});
