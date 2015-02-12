/*jshint -W117 */
var UT = window.UT || {};

UT.Auth = Backbone.Model.extend({
    getLoginStatus: function(callback) {
        var that = this;
        FB.getLoginStatus(function(response) {
            callback(response, that);
        });
    },
    statusLoginOn: function() {
        this.set('loginStatus', true);
    },
    statusLoginOff: function() {
        this.set('loginStatus', false);
    },
    defaults: {
        loginStatus: false
    }
});
