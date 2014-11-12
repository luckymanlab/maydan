
var createIncidentTemplate = '' +
    '<div class="modal fade" id="createNewIncident" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">' +
        '<div class="modal-dialog">' +
            '<div class="modal-content">' +
                '<div class="modal-header">' +
                    '<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only"></span></button>' +
                    '<h4 class="modal-title" id="myModalLabel">Add incident</h4>' +
                '</div>' +
                '<div class="modal-body">' +
                    '<form class="form-horizontal" role="form">' +
                        '<div class="form-group">' +
                            '<div class="col-sm-10">' +
                                '<input class="form-control" type="text" placeholder="Please, enter title">' +
                            '</div>' +
                        '</div>' +
                        '<div class="form-group">' +
                            ' <div class="input-group date form_datetime col-sm-10" data-date="2013-10-16T05:25:07Z" data-date-format="dd MM yyyy - HH:ii p" data-link-field="dtp_input1">' +
                                ' <span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>' +
                                '<input class="form-control" size="16" type="text" value="" readonly placeholder="Please, enter date">' +
                            '</div>' +
                            '<input type="hidden" id="dtp_input1" value="" /><br/>' +
                        '</div>' +
                        '<div class="row" data-example>' +
                            '<div class="col-sm-10">' +
                                '<div id="default-place">' +
                                    '<input id="placepicker" class="form-control" data-latitude="53.538764" data-longitude="10.028240"/>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                        '<div class="row" data-example>' +
                            '<div class="col-sm-10">' +
                                '<div class="form-group">' +
                                    '<div class="input-group">' +
                                        '<span class="input-group-btn">' +
                                            '<button data-toggle="collapse" href="#collapseOne" class="btn btn-default">' +
                                                '<i class="glyphicon glyphicon-globe"></i>' +
                                            '</button>' +
                                        '</span>' +
                                        '<input id="placepicker" class="placepicker form-control" placeholder="Please, switch coordinate"/>' +
                                    '</div>' +
                                '</div>' +
                                '<div id="collapseOne" class="collapse">' +
                                    '<div class="placepicker-map thumbnail"></div>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                        '<!--incident type-->' +
    '' +
    '' +
                        '<div class="form-group">' +
                            '<div class="col-sm-10">' +
                                '<textarea class="form-control"  rows="5" placeholder="Please, enter description of incident"></textarea' +
                            '</div>' +
                        '</div>' +
                    '</form>' +
                '</div>' +
                '<div class="modal-footer">' +
                    '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>' +
                    '<button type="button" class="btn btn-primary">Save changes</button>' +
                '</div>' +
            '</div>' +
        '</div>' +
    '</div>';

