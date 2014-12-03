var UT = window.UT || {};

UT.Article = Backbone.Model.extend({
    urlRoot: UT.Config.saveArticlePath,
    defaults:{
        incident: new UT.Incident(),
        media: new UT.Media()
    },
    validate: function( attributes ) {
        this.validationEmptyField(attributes.incident.attributes);
        this.validationEmptyField(attributes.media.attributes);
    },
    validationEmptyField: function(model){
        for(var attr in model){
            var attrValue = model[attr];
            if(attrValue == ''){
                return false;
            }
        }
    }
});
