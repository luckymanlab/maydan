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

    doFacebookAuth: function () {
        UT.auth.getLoginStatus(function(response, model) {
            if(response.status === 'connected'){
                model.statusLoginOn();
            } else {
            /*
             * facebook login
             */
                FB.login(function(resp) {
                    if(resp.status === 'connected') {
                        model.statusLoginOn();
                    } else {
                        model.statusLoginOff();
                    }
                });
            }
        });
    }

});