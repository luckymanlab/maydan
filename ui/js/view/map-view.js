/*global UT, Backbone*/
/*jshint -W079 */
var UT = window.UT || {};

/**
 * Constructor of ItemView
 * @constructor
 * @extends Backbone.Marionette.ItemView
 */
UT.MapView = Backbone.Marionette.ItemView.extend({
    /**
     * Initialize ItemView
     */
    initialize: function() {
        this.initMap();
    },

    /**
     * Initialize main map on the page
     */
    initMap: function() {
        this.map = $('#map');
        var center = new google.maps.LatLng(50.450201, 30.524021);
        var styles = [
            {
                elementType: 'geometry',
                stylers: [
                    { saturation: -80 }
                ]
            }
        ];

        var mapOptions = {
            zoom: 18,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            center: center,
            styles: styles
        };
        this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
    }
});