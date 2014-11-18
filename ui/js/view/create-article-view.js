var UT = window.UT || {};

UT.CreateArticleView = Backbone.View.extend({
    initialize: function(){
        this.model = new UT.Article();
        this.render();
    },
    render: function(){
        var that = this;
        $.get('templates/createArticleTemplate.html', function (data) {
            var template=_.template(data);
            that.$el.append(template); //adding the template content to the main template.
            that.popupFormInitialize();
        }, 'html');
        this.showModal();
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
        var timeValue = new Date(incidentDate.value).getTime();
        var lat = hiddenMapCoordinateLat.value;
        var lng = hiddenMapCoordinateLng.value;
        e.preventDefault();
        this.model.get('incident').set({coordinates: {lat:lat , lng:lng }});
        this.model.get('incident').set({time: timeValue , title: incidentTitle.value});
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
    closeArticleModal: function(){
        if(!this.checkFilledFields()){
            $('#confirm-modal').modal('show');
            $('#article-content').css('opacity', .5);
        } else{
            this.destroyView();
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
        }
        return isFilled;
    },
    closeModalConfirm: function(){
        $('#article-content').css('opacity', 1);
        this.destroyView();
    },
    cancelModalConfirm: function(){
        $('#confirm-modal').modal('hide');
        $('#article-content').css('opacity', 1);
    },
    destroyView: function () {
        $('.modal-backdrop').remove();
        $('.pac-container').remove();
        $('.datetimepicker').remove();

        this.unbind(); // Unbind all local event bindings
        this.model.unbind( 'change', this.render, this ); // Unbind reference to the model
        this.remove();// Remove view element from Dom

    },
    popupFormInitialize: function () {
    //coordinate
    // Basic usage
        $('#placepicker').placepicker();

        // Advanced usage
        $('.placepicker').each(function() {

            // find map-element
            var target = this;
            var $collapse = $(this).parents('.form-group').next('.collapse');
            var $map = $collapse.find('.placepicker-map');
            // init placepicker
            var placepicker = $(this).placepicker({
                map: $map.get(0),
                placeChanged: function(place) {
                    $('#hiddenMapCoordinateLat').attr('value', this.getLocation().latitude);
                    $('#hiddenMapCoordinateLng').attr('value',this.getLocation().longitude);
                }
            }).data('placepicker');

            // reload map after collapse in
            $collapse.on('show.bs.collapse', function () {

                window.setTimeout(function() {
                    placepicker.resizeMap();
                    placepicker.reloadMap();
                    if (!$(target).prop('value')) {
                        placepicker.geoLocation();
                    }
                }, 0);
            });
        });

        //date time picker
        $('.form_datetime').datetimepicker({
            language:  'us',
            weekStart: 1,
            todayBtn:  1,
            autoclose: 1,
            todayHighlight: 1,
            startView: 2,
            forceParse: 0,
            showMeridian: 1,
            format: 'yyyy/mm/dd hh:mm'
        });

        //select marker
        $('#mainSelectIncidentType').on('click', function() {
            if ( $('#optionsIncidentType').css('display') === 'none' ) {
                $('#optionsIncidentType').css('display', 'block');
            } else {
                $('#optionsIncidentType').css('display', 'none');
            }
        });
        $('#optionsIncidentType > .select-option').on('click', function() {
            $('#mainSelectIncidentType > span').text($(this).text()).removeClass('placeholder');
            $('#optionsIncidentType').css('display', 'none');
            $('#hiddenIncidentType').attr('value', $(this).text());
        });
    }
});
