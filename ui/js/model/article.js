var UT = window.UT || {};

UT.Article = Backbone.Model.extend({
    urlRoot:'http://localhost:3000/temp/articles',
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
