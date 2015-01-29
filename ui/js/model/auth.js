/*jshint -W117 */
var UT = window.UT || {};

UT.Auth = Backbone.Model.extend({
    getLoginStatus: function(callback) {
        FB.getLoginStatus(function(response) {
            callback(response);
        });

    }
});
