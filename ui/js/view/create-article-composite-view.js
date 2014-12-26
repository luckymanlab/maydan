/*global UT, Backbone */
/*jshint -W079 */
var UT = window.UT || {};

/**
 Constructor of CompositeView
 @constructor
 @extends Backbone.Marionette.CompositeView
 */
UT.CreateArticleCompositeView = Backbone.Marionette.CompositeView.extend({
    template: '<div>hello<div id="hio"></div></div>',
    childView: UT.UnitTypeSelectItemView,
    childViewContainer: '#hio',
    el: '#popup-create-article',
    initialize: function() {
        this.render();
    }
});
