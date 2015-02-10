/*jshint -W031*/
var UT = window.UT || {};

UT.MainAppView = Backbone.Marionette.ItemView.extend({
    initialize: function() {
        UT.auth.on('change:loginStatus', function() {
            if(UT.auth.get('loginStatus')) {
                UT.i18n.fetch({
                    success: function(){
                        new UT.AdministrationView();
                    }
                });
            }
        });
        UT.facebookAuthView.doFacebookAuth();
    }
});