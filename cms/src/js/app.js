var UT = window.UT || {};

UT.app = new Marionette.Application();

UT.app.start = function(){
    UT.i18n = new UT.I18n();
    UT.auth = new UT.Auth();
    UT.facebookAuthView = new UT.FacebookAuthView();
    UT.mainAppView = new UT.MainAppView();

    var originalSync = Backbone.sync;
    Backbone.sync = function(method, model, options) {
        options.headers = options.headers || {};
        UT.auth.getLoginStatus(function(response) {
            _.extend(options.headers, { 'X-FB-Token': response.authResponse.accessToken});
            originalSync.call(model, method, model, options);
        });

    };
};

UT.app.start();