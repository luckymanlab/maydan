var tlDateUtil;
tlDateUtil = (function () {
	var process = {
		MS_IN_SECOND: 1000,
		MS_IN_MINUTE: 60 * 1000,
		MS_IN_HOUR: 60 * 60 * 1000,
		MS_IN_DAY: 24 * 60 * 60 * 1000,
		yearNumber: function (d) {
			var year = new Date(d).getUTCFullYear();
			return year;
		},
		monthNumber: function (d) {
			var month = new Date(d).getUTCMonth();
			return month;
		},
		dateNumber: function (d) {
			var date = new Date(d).getUTCDate();
			return date;
		},
		hoursNumber: function (d) {
			var hours = new Date(d).getUTCHours();
			return hours;
		},
		minutesNumber: function (d) {
			var minutes = new Date(d).getUTCMinutes();
			return minutes;
		},
		secondsNumber: function (d) {
			var seconds = new Date(d).getUTCSeconds();
			return seconds;
		},
		dayInWeekNumber: function (d) {
			var day = new Date(d).getUTCDay();
			return day;
		},
		timeStamp: function (d) {
			var timeStamp = new Date(d).getTime();
			return timeStamp;
		},
		dateLiteral: function (d) {
			var dateLiteral = new Date(+d);
			dateLiteral = dateLiteral.getUTCFullYear() + '-' + (dateLiteral.getUTCMonth() + 1) + '-' +
				dateLiteral.getUTCDate() + ' ' + dateLiteral.getUTCHours() + ':' +
				that.minuteReductionToType(dateLiteral.getUTCMinutes()) + ':' +
				dateLiteral.getUTCSeconds();
			return dateLiteral;
		},
		currentDayMsOnly: function (currentDate) {
			var currentDateTimeStartMS = new Date(currentDate);
			currentDateTimeStartMS = currentDateTimeStartMS.getTime() -
				currentDateTimeStartMS.getUTCHours() * that.MS_IN_HOUR -
				currentDateTimeStartMS.getUTCMinutes() * that.MS_IN_MINUTE -
				currentDateTimeStartMS.getUTCSeconds() * that.MS_IN_SECOND -
				currentDateTimeStartMS.getUTCMilliseconds();

			var currentDateTimeMs = currentDate;
			var cdTime = currentDateTimeMs - currentDateTimeStartMS;
			return cdTime;
		},
		numberOfDaysInMonth: function (year, month) {
			var d = new Date(year, month, 0);
			return d.getDate();
		},
		minuteReductionToType: function (minutes) {
			if (minutes < 10) {
				minutes = '0' + minutes;
			}
			return minutes;
		},
		newCurrentDateTimeStamp: function (currentDate, zoomPx, zoomSec, pixelChangeWidth) {
			var change = pixelChangeWidth / zoomPx * zoomSec;
			var newCurrentDate = tlDateUtil.timeStamp(currentDate) - change;
			return newCurrentDate;
		},
		newCurrentRange: function (currentDate, zoomPx, zoomSec, curentDatePosPx) {
			var currentDateTimeMs = tlDateUtil.timeStamp(currentDate);
			var msMiddleTimeLine = curentDatePosPx / zoomPx * zoomSec;
			var timeStampObj = {};
			timeStampObj.timeLineStartMs = currentDateTimeMs - msMiddleTimeLine + zoomSec;
			timeStampObj.timeLineEndMs = currentDateTimeMs + msMiddleTimeLine - zoomSec;
			return timeStampObj;
		},
		newTimeLineRange: function (currentDate, zoomPx, zoomSec, curentDatePosPx) {
			var msMiddleTimeLine = curentDatePosPx / zoomPx * zoomSec;
			var timeStampObj = {};
			timeStampObj.timeLineStartMs = tlDateUtil.timeStamp(currentDate) - msMiddleTimeLine;
			timeStampObj.timeLineEndMs = tlDateUtil.timeStamp(currentDate) + msMiddleTimeLine;
			return timeStampObj;
		}
	};
	var that = process;
	console.log(that);
	return process;
})();