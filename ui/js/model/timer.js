/*global UT, Backbone */
/*jshint -W079 */
var UT = window.UT || {};

/**
 * Constructor of model.
 * @constructor
 * @extends Backbone.Model
 * @property {number} TIMER_INTERVAL   - constant for interval in startTimer method
 * @property {number} TIMER_RANGE      - constant for range of timer
 * @property {number} time             - current selected date
 * @property {boolean} isStartedTimer  - flag for stop timer
 *
 */
UT.Timer = Backbone.Model.extend({
    TIMER_INTERVAL: UT.Config.timerInterval,
    TIMER_RANGE: UT.Config.timerRange,
    defaults: {
        time: UT.Config.timerStartDate,
        isStartedTimer: false
    },

    sync: function () { return false;},

    /**
     * Initialize Model timer starts
     *
     */
    initialize: function() {
        this.startTimer();
    },

    /**
     * Set property time
     * @argument {number}  newTime - set argument to property time
     */
    setTime: function(newTime) {
        if(newTime) {
            this.set('time', newTime);
        } else {
            console.log('new time is not defined');
        }
    },

    /**
     * Set property time
     * @return{number}  this.time
     */
    getTime: function() {
        return this.get('time');
    },

    /**
     * start timer from default time UT.Config.timerStartDate with default interval UT.Config.timerInterval
     */
    startTimer: function() {
        var that = this;
        if(!this.isStartedTimer) {
            this.isStartedTimer = setInterval(function() {
                that.setTime(that.getTime() + that.TIMER_RANGE);
            }, this.TIMER_INTERVAL);
        }
    },

    /**
     * Stop timer
     */
    stopTimer: function() {
        var that = this;
        if(this.isStartedTimer) {
            clearInterval(that.isStartedTimer);
            this.isStartedTimer = false;
        }
    }
});