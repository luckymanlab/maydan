var UT = window.UT || {};

UT.ArticlePreviewView = Marionette.ItemView.extend({
    template: "#article-preview-modal",
    events: {
        'click .delete-item': 'destroyItem',
        'click .confirm-item': 'confirmItem',
        'click #close-modal': 'destroy'
    },
    initialize: function(model) {
        this.model = model;
        this.render();
    },
    onRender: function() {
        var coordinates = this.model.attributes.incident.coordinates || {
            lat: 0,
            lon: 0
        };
        this.showModal();
        this.initMapCoordinate(coordinates.lat, coordinates.lon);
    },
    onDestroy: function() {
        this.$el.modal('hide');
    },
    showModal: function() {
        this.$el.modal('show');
        $('#article-modal').show();
    },
    initMapCoordinate: function(lat, lon) {
        /* jslint nonew: false */
        var myLatlng = new google.maps.LatLng(lat, lon);
        var mapOptions = {
            zoom: 18,
            draggable: false,
            center: myLatlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        new google.maps.Marker({
            position: myLatlng,
            map: new google.maps.Map($('#map')[0], mapOptions)
        });
        /* jslint nonew: true */
    },
    destroyItem: function(event) {
        this.destroy();
        this.model.destroy();
    },
    confirmItem: function(event) {
        this.destroy();
        this.model.confirm();
    }
});
