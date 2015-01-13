var UT = window.UT || {};
/*jshint -W117 */
UT.UnitMapView = Backbone.Marionette.ItemView.extend({
    /**
     * Add Unit(Marker and PopUp) to the Map
     */
	initialize: function(options) {
		var that = this;

		that.model = options.model;
		that.model.on('remove', that.remove, that);
		that.map = options.map;
		var pos = that.model.getUnitPos();
        /**
         * create Marker
         */
		that.marker = new google.maps.Marker({
			map: that.map,
            position: new google.maps.LatLng(pos.lat, pos.lon),
			animation: google.maps.Animation.DROP,
			title: that.model.getUnitTitle(),
			icon: 'img/markers/' + that.model.getUnitType() + '.png',
			id : that.model.getUnitId()
		});
        /**
         * create PopUp content
         */
        var time = new Date(that.model.get('time'));
		that.content = $('<div><h4>' + that.model.getUnitTitle() + '</h4><span>' + time + '</span></div>');
        /**
         * create PopUp and add content
         */
		that.infoBubble = new InfoBubble({
			maxWidth: 150,
			minHeight: 20,
			content: that.content[0]
		});

		google.maps.event.addListener(that.marker, 'click', function(){
			that.markerClick(that);
		});
        /**
         * Add PopUp on the Map after few milliseconds
         */
		setTimeout(function(){
			that.infoBubble.open(that.map, that.marker);
			that.infoBubble.hideCloseButton();
			that.infoBubble.setZIndex(that.marker.getZIndex());
			google.maps.event.addDomListener(that.content[0], 'click', function(){
				that.markerClick(that);
			});
		}, 800);
	},

	markerClick: function (that){
		that.marker.setZIndex(google.maps.Marker.MAX_ZINDEX + 1);
		that.infoBubble.setZIndex(google.maps.Marker.MAX_ZINDEX + 2);
	},

	remove : function(){
		this.marker.setMap(null);
		this.marker = null;
	}
});
