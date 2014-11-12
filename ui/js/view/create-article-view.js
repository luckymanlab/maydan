var UT = window.UT || {};

UT.CreateArticleView = Backbone.View.extend({
    initialize: function(){
        this.render();
    },
    render: function(){
        var that = this;
        $.get('js/templates/createArticleTemplate.html', function (data) {
            var template=_.template(data);
            that.$el.html(template); //adding the template content to the main template.
        }, 'html');
    },
    events: {
        'click #saveArticle': 'saveArticle',
        'click #cancel': 'cancelArticle',
        'click #closeModal': 'cancelArticle'
    },
    showModal: function () {
        this.$el.modal('show');
    },
    saveArticle: function(e){
        e.preventDefault();
        var c = this.model.get('incident');
        this.model.get('incident').set({time: incidentTime.value , title: incidentTitle.value});
        this.model.get('media').set({content: mediaContent.value});
        this.model.save({}, {
            dataType: 'text',
            success: function (model, response, options) {
                console.log("The model has been saved to the server" , response, model, options);
            },
            error: function (model, response, options) {
                console.log("Something went wrong while saving the model",response);
            }
        });
    },
    cancelArticle: function(){
        this.checkFilledFields();
    },
    checkFilledFields:function(){
        var filledInput  = $('input:text').filter(function(){
            return $.trim(this.value) != ''
        });
        var filledTextarea = $('textarea').filter(function(){
            return $.trim(this.value) != ''
        });
        if(filledInput.length || filledTextarea.length)
        {
            console.log("Not Empty!");
            alert("Are you sure?");
            return;
        }
    }
});
