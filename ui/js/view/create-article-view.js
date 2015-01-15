/*global UT, Backbone*/
/*jshint -W079 */
var UT = window.UT || {};

/**
 Constructor of CompositeView
 @constructor
 @extends Backbone.Marionette.CompositeView
 @property {object}  childView                - The child ItemView.
 @property {string}  childViewContainer       - The id of ItemView parent element.
 @property {object}  model                    - The model of CompositeView.
 @property {object}  events                   - The events of CompositeView.
 */
UT.CreateArticleView = Backbone.Marionette.CompositeView.extend({
    childView: UT.UnitTypeSelectItemView,
    childViewContainer: '#unit-type-select-container',
    model: new UT.Article(),
    events: {
        'click #saveArticle': 'saveArticle',
        'click #closeModal,#closeArticleModal': 'closeArticleModal',
        'click #closeConfirm,#closeConfirm-default': 'closeModalConfirm',
        'click #closeReturn': 'cancelModalConfirm',
        'change #unitTitle, #mediaContent, #unitDate': 'validateInput',
        'click #optionsUnitType': 'validateSelect'
    },

    /**
     * Initialize CompositeView, get template & render view
     */
    initialize: function() {
        var that = this;
        $.get(UT.Config.createArticleTemplate, function(data) {
            that.template = _.template(UT.i18n.processTemplate(data));
            that.render();
        });
    },

    /**
     * After render show modal window initialize plugins for form & create ItemView
     */
    onRender: function() {
        this.$el.modal('show');
        this.popupFormInitialize();
        /* jslint nonew: false */
        new UT.UnitTypeSelectView();
        /* jslint nonew: true */
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
            inputs =  $('#articleForm').find('.input-data');

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
        this.model.save({}, {
            dataType: 'text',
            success: function (model, response, options) {
                console.log('The model has been saved to the server' , response, model, options);
                $('#articleForm')[0].reset();
                $('.alert-success').toggle();
            },
            error: function (model, response, options) {
                console.log('Something went wrong while saving the model',response);
                $('#articleForm')[0].reset();
                $('.alert-danger').toggle();
            }
        });
    },

    closeArticleModal: function(){
        if(this.filledFields()){
            $('#confirmModal').modal('show');
            $('#articleContent').css('opacity', 0.5);
        } else{
            this.destroyView();
        }
    },
    /**
     * Check if form fields is filled
     * @returns {Boolean} is fields filled or empty
     */
    filledFields:function(){
        /**
         * "skip-identifier" -> this input need skip, since he has special check-function
         */
        var inputs =  $('#articleForm').find('.input-data').not('.skip-identifier');
        var hiddenMapCoordinateLat = $('#hiddenMapCoordinateLat')[0].value;
        var hiddenMapCoordinateLng = $('#hiddenMapCoordinateLng')[0].value;
        var customSelectorValue = $('#selectedValue')[0].innerText;
        var isEmpty = _.every(inputs, function(input){
            var inputValue = input.value;
            return inputValue.length === 0;
        });
        if (!isEmpty) {
            return true;
        }
        if (hiddenMapCoordinateLat !== undefined && hiddenMapCoordinateLng !== undefined &&
            hiddenMapCoordinateLat !== UT.Config.defaultPosition.lat &&
            hiddenMapCoordinateLng !== UT.Config.defaultPosition.lon) {
            return true;
        }
        /**
        * UnitType doesn't have value
        */
        if (customSelectorValue !== UT.i18n.attributes.SELECT_TYPE) {
            return true;
        }
        return false;
    },

    closeModalConfirm: function(){
        $('#articleContent').css('opacity', 1);
        this.destroyView();
    },

    cancelModalConfirm: function(){
        $('#confirmModal').modal('hide');
        $('#articleContent').css('opacity', 1);
    },

    /**
     * Destroy view
     */
    destroyView: function () {
        $('.modal-backdrop').remove();
        $('.pac-container').remove();
        $('.datetimepicker').remove();
        this.unbind(); // Unbind all local event bindings
        this.model.unbind( 'change', this.render, this ); // Unbind reference to the model
        this.remove();// Remove view element from Dom

    },

    /**
     * Initialize placepicker & datetimepacker for form
     */
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
