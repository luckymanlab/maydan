function popupFormInitialize () {
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
