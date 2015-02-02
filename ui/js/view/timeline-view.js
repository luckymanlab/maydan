/*global UT, Backbone*/
/*jshint -W079 */
var UT = window.UT || {};
var Timeline = window.Timeline || {};

/**
 * Constructor of ItemView
 * @constructor
 * @extends Backbone.Marionette.ItemView
 * @property {string}  el                    - Parent element of view.
 * @property {object}  events                - The events of ItemView.
 * @property {boolean}  dragStopedFlag       - Flag for checking drag condition
 */
UT.TimelineView = Backbone.Marionette.ItemView.extend({
    el: '.time-block',
    events: {
        'click .start-time-line': 'UT.timer.startTimer',
        'click .stop-time-line': 'UT.timer.stopTimer'

    },
    dragStopedFlag: true,

    /**
     * Initialize ItemView
     */
    initialize: function() {
        var that = this;
        Timeline.core.init(that.$el, UT.Config.timelineOptions);
        this.listenTo(UT.timer, 'change', that.changeTimeline);
        $('#tl-container').on('dragStarted', that.dragStart);
        $('#tl-container').on('dragStopped', that.dragStop);
    },

    /**
     * Stop timer & change condition of dragStopedFlag
     */
    dragStart: function() {
        this.dragStopedFlag = false;
        UT.timer.stopTimer();
    },

    /**
     * Set time from timeline to timer model & start timer & dragStopedFlag
     */
    dragStop: function(event) {
        var newTime = Timeline.core.getCurrentDate();
        event.stopPropagation();
        UT.timer.setTime(newTime);
        this.dragStopedFlag = true;
        UT.timer.startTimer();
    },

    /**
     * change current date of timeline
     */
    changeTimeline: function() {
        if(this.dragStopedFlag) {
            Timeline.core.setDate(UT.timer.getTime());
        }
    }
});
