var UT = window.UT || {};

UT.Article2 = Backbone.Model.extend({
    urlRoot:'http://localhost:3000/temp/articles',
    defaults:{
        incident: new UT.Incident(),
        media: new UT.Article()
    },
    validate: function( attributes ) {
        this.validationEmptyField(attributes.incident.attributes);
        this.validationEmptyField(attributes.media.attributes);
    },
    validationEmptyField: function(model){
        for(var attr in model){
            var attrValue = model[attr];
            console.log(attrValue);
            if(attrValue == ''){
                console.log('You should enter ' + attr);
                return false;
            }
        }
    }
});
