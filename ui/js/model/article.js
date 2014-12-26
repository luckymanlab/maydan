var UT = window.UT || {};

UT.Article = Backbone.Model.extend({
    urlRoot: 'http://localhost:3000/temp/articles',
    defaults:{
        unit: new UT.Unit(),
        media: new UT.Media()
    },
    validate: function( attributes ) {
        this.validationEmptyField(attributes.unit.attributes);
        this.validationEmptyField(attributes.media.attributes);
    },
    validationEmptyField: function(model){
        for(var attr in model){
            if(model.hasOwnProperty(attr) && model[attr] === ''){
                return false;
            }
        }
    }
});
