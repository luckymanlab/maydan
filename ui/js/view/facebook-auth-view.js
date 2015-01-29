/*jshint -W031, -W117 */
var UT = window.UT || {};

UT.FacebookAuthView = Backbone.Marionette.ItemView.extend({
    initialize: function() {
        //Facebook initialize
        FB.init({
            appId      : UT.Config.facebookAppId,
            cookie     : true,  // enable cookies to allow the server to access
            // the session
            xfbml      : true,  // parse social plugins on this page
            version    : 'v2.1' // use version 2.1
        });
    },

    doFacebookAuth: function (callback) {
        UT.auth.getLoginStatus(function(response){
            if(response.status === 'connected'){
                callback();
            } else {
            /*
             * facebook login and than run callback function
             */
                FB.login(function(resp) {
                    if(resp.status === 'connected') {
                        callback();
                    }
                });
            }
        });
    }

});