var UT = window.UT || {};
UT.Article = Backbone.Model.extend({
    defaults:{
        incident: new UT.Incident(),
        media: new UT.Media(),
        criationDate: ''
    }
});