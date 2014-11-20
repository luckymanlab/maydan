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
        //this.setUpListeners();
        this.showModal();
    },
    events: {
        'click #save-article': 'saveArticle',
        'click #close-modal,#close-article-modal': 'closeArticleModal',
        'click #close-confirm,#close-confirm-default': 'closeModalConfirm',
        'click #close-return': 'cancelModalConfirm'
    },
    showModal: function () {
        this.$el.modal('show');
    },
    validateForm: function(){
        var isValid = true,
            that = this,
            inputs =  $('#article-form').find('.inputData');
        _.forEach(inputs,function(input){
            var inputValue = input.value,
                label = $(input).attr('data-label'),
                formGroup = input.parentNode.parentNode,
                textError = 'Enter ' + label;
            if (inputValue.length === 0){
                $(formGroup).addClass('has-error').removeClass('has-success');
                $(input).tooltip({
                    trigger: 'manual',
                    placement: 'right',
                    title: textError
                }).tooltip('show');
                isValid =false;
            } else {
                $(formGroup).addClass('has-success').removeClass('has-error');
                that.removeError(input);
            }
        });
        return isValid;
    },
    //setUpListeners: function(){
    //    $('#article-form input').on('keydown', function(e){console.log(e,e.target(),this)});
    //},
    removeError: function(input){
        $(input).tooltip('destroy');
    },
    saveArticle: function(e){
        var that = this,
            timeValue = new Date(incidentDate.value).getTime(),
            lat = hiddenMapCoordinateLat.value,
            lng = hiddenMapCoordinateLng.value,
            incident = this.model.get('incident'),
            media = this.model.get('media');
        e.preventDefault();
        incident.set({coordinates: {lat:lat , lng:lng }});
        incident.set({time: timeValue , title: incidentTitle.value});
        media.set({content: mediaContent.value});
        if (!this.validateForm()){
            return;
        };
        this.model.save({}, {
            dataType: 'text',
            success: function (model, response, options) {
                console.log("The model has been saved to the server" , response, model, options);
                $('#article-form')[0].reset();
                $('.alert-success').toggle();
            },
            error: function (model, response, options) {
                console.log("Something went wrong while saving the model",response);
                $('#article-form')[0].reset();
                $('.alert-danger').toggle();
            }
        });
    },
    closeArticleModal: function(){
        if(this.filledFields()){
            $('#confirm-modal').modal('show');
            $('#article-content').css('opacity', .5);
        } else{
            this.destroyView();
        }
    },
    filledFields:function(){
        var isFilled = false,
            inputs =  $('#article-form').find('.inputData');
        _.forEach(inputs,function(input){
            var inputValue = input.value;
            if(inputValue.length !== 0){
                isFilled = true;
                return isFilled;
            }
        });
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
