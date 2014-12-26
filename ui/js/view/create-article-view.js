var UT = window.UT || {};
/*jshint -W015 */

UT.CreateArticleView = Backbone.View.extend({

    initialize: function(){
        this.model = new UT.Article();
        this.render();
    },
    render: function(){
        var that = this;
        $.get('templates/create-article-template.html', function (data) {
            var template=_.template(UT.i18n.processTemplate(data));
            that.$el.append(template); //adding the template content to the main template.
            that.popupFormInitialize();
            that.createUnitTypesView();
        }, 'html');
        this.showModal();
    },
    events: {
        'click #save-article': 'saveArticle',
        'click #close-modal,#close-article-modal': 'closeArticleModal',
        'click #close-confirm,#close-confirm-default': 'closeModalConfirm',
        'click #close-return': 'cancelModalConfirm',
        'change #unitTitle, #mediaContent, #unitDate': 'validateInput',
        'click #optionsUnitType': 'validateSelect'
    },
    createUnitTypesView: function() {
        /* jslint nonew: false */
        new UT.UnitTypeSelectItemView();
    },
    showModal: function () {
        this.$el.modal('show');
    },
    validate: function(input, that) {
        var inputValue = input.value,
            label = $(input).attr('data-label'),
            formGroup = input.parentNode.parentNode,
            textError = 'Enter ' + label,
            isValid = true;
        if (input.id === 'mainSelectUnitType') {
            inputValue = $('#selectedValue')[0].innerText;
        }
        if (inputValue === undefined || inputValue.length === 0 || inputValue === UT.i18n.attributes.SELECT_TYPE) {
            $(formGroup).addClass('has-error').removeClass('has-success');
            $(input).tooltip({
                trigger: 'manual',
                placement: 'right',
                title: textError
            }).tooltip('show');
            isValid = false;
        } else {
            $(formGroup).addClass('has-success').removeClass('has-error');
            that.removeError(input);
        }
        return isValid;
    },
    validateForm: function() {
        var isValid = true,
            that = this,
            inputs =  $('#article-form').find('.inputData');
        _.forEach(inputs,function(input) {
            if (that.validate(input, that) === false) {
                isValid = false;
            }
        });
        return isValid;
    },
    validateInput: function(e) {
        var that = this,
            input =  e.target;
        return that.validate(input, that);
    },
    validateSelect: function() {
        var that = this,
            input = $('#mainSelectUnitType')[0];
        return that.validate(input, that);
    },
    removeError: function(input){
        $(input).tooltip('destroy');
    },
    saveArticle: function(e){
        var unitDate = $('#unitDate')[0],
            hiddenUnitType = $('#hiddenUnitType')[0],
            hiddenMapCoordinateLat = $('#hiddenMapCoordinateLat')[0],
            hiddenMapCoordinateLng = $('#hiddenMapCoordinateLng')[0],
            mediaContent = $('#mediaContent')[0],
            unitTitle = $('#unitTitle')[0];
        var obj = {
                time: new Date(unitDate.value).getTime(),
                type: hiddenUnitType.value,
                coordinates: {
                    lat: parseFloat(hiddenMapCoordinateLat.value),
                    lon: parseFloat(hiddenMapCoordinateLng.value)
                },
                title: unitTitle.value
            },
            unit = this.model.get('unit'),
            media = this.model.get('media');
        unit.set(obj);
        media.set({content: mediaContent.value});
        if (!this.validateForm()){
             return;
        }
        this.model.set('accessToken', $.cookie('accessToken'));
        console.log(this.model);
        this.model.save({}, {
            dataType: 'text',
            success: function (model, response, options) {
                console.log('The model has been saved to the server' , response, model, options);
                $('#article-form')[0].reset();
                $('.alert-success').toggle();
            },
            error: function (model, response, options) {
                console.log('Something went wrong while saving the model',response);
                $('#article-form')[0].reset();
                $('.alert-danger').toggle();
            }
        });
    },
    closeArticleModal: function(){
        if(this.filledFields()){
            $('#confirm-modal').modal('show');
            $('#article-content').css('opacity', 0.5);
        } else{
            this.destroyView();
        }
    },
    filledFields:function(){
        var isFilled = false,
            inputs =  $('#article-form').find('.inputData');
        _.forEach(inputs,function(input){
            var inputValue = input.value;
            if(inputValue !== undefined && inputValue.length !== 0){
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
        this.unitTypesView.destroy();
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
    }
});