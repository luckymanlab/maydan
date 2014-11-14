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
        'click #save-article': 'saveArticle',
        'click #close-modal': 'closeArticleModal',
        'click #close-article-modal': 'closeArticleModal',
        'click #close-confirm': 'closeModalConfirm',
        'click #close-confirm-default': 'closeModalConfirm',
        'click #close-return': 'cancelModalConfirm'
    },
    showModal: function () {
        this.$el.modal('show');
    },
    saveArticle: function(e){
        e.preventDefault();
        this.model.get('incident').set({time: incidentDate.value , title: incidentTitle.value},{coordinates: {lat:hiddenMapCoordinateLat.value , lon: hiddenMapCoordinateLng.value}});
        this.model.get('media').set({content: mediaContent.value});
        console.log(this.model);
        this.model.save({}, {
            dataType: 'text',
            success: function (model, response, options) {
                console.log("The model has been saved to the server" , response, model, options);
            },
            error: function (model, response, options) {
                console.log("Something went wrong while saving the model",response);
            }
        });
        //this.formReset();
    },
    closeArticleModal: function(){
        if(!this.checkFilledFields()){
            $('#confirm-modal').modal('show');
            $('#article-content').css('opacity', .5);
            $('#article-content').unbind();
        }
        else{
            this.$el.modal('hide');
        }
    },
    checkFilledFields:function(){
        var isFilled = true;
        var filledInput  = $('input:text:visible').filter(function(){
            return $.trim(this.value) != ''
        });
        var filledTextarea = $('textarea').filter(function(){
            return $.trim(this.value) != ''
        });
        if(filledInput.length || filledTextarea.length)
        {
            isFilled = false;
            console.log("Not Empty!");
        }
        return isFilled;
    },
    closeModalConfirm: function(){
        $('#article-content').css('opacity', 1);
        this.formReset();
    },
    cancelModalConfirm: function(){
        $('#confirm-modal').modal('hide');
        $('#article-content').css('opacity', 1);
    },
    formReset: function(){
        //$('#article-form').find('input,textarea').val('');
        //$('#article-form').find('input, textarea').val('');
        //$('#mainSelectIncidentType > span').text('Please, select mark').addClass('placeholder');
    }

});
