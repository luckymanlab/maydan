/*jshint -W031*/
var UT = window.UT || {};

UT.MainAppView = Backbone.Marionette.ItemView.extend({
    initialize: function() {
        var that = this;
        UT.auth.on('change:loginStatus', function() {
            if(UT.auth.get('loginStatus')) {
                UT.i18n.fetch({
                    success: function(){
                        that.mainView = new UT.AdministrationView();
                    }
                });
            } else {
                that.mainView.destroy();
                UT.facebookAuthView.doFacebookAuth();
            }
        });
        UT.facebookAuthView.doFacebookAuth();
    }
});