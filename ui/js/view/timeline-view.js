/*global UT, Backbone*/
/*jshint -W079 */
var UT = window.UT || {};
var Timeline = window.Timeline || {};

/**
 * Constructor of ItemView
 * @constructor
 * @extends Backbone.Marionette.ItemView
 * @property {string}  el                - Parent element of view.
 * @property {object}  events            - The events of ItemView.
 * @property {object}  modelEvents       - views events of model.
 */
UT.TimelineView = Backbone.Marionette.ItemView.extend({
    el: '.time-block',
    events: {
        'click .start-time-line': 'startTimeline',
        'click .stop-time-line': 'stopTimeline'

    },
    modelEvents: {
        'change': 'changeTimeline'
    },

    /**
     * Initialize ItemView
     */
    initialize: function() {
        Timeline.core.init(this.$el, UT.Config.timelineOptions);
    },

    /**
     * Stop timeline
     */
    stopTimeline: function() {
        this.model.stopTimer();
    },

    /**
     * Move timeline
     */
    startTimeline: function() {
        this.model.startTimer();
    },

    /**
     * change current date of timeline
     */
    changeTimeline: function() {
        Timeline.core.setDate(this.model.getTime());
    }
});
