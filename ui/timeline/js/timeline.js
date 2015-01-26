var Timeline = window.Timeline || {};

Timeline.core = (function () {
	var process = {
		DAY_IN_WEEK: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
		MONTH_NAME: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
		CLASS_NAME: {
			yearElement: 'date-year-element',
			monthElemnt: 'date-month-element',
			dayElement: 'date-day-element',
			element: 'date-element'
		},
		ZOOM_1_5_MINUTE: 5 * Timeline.tlDateUtil.MS_IN_MINUTE,
		ZOOM_2_15_MINUTE: 15 * Timeline.tlDateUtil.MS_IN_MINUTE,
		ZOOM_3_30_MINUTE: 30 * Timeline.tlDateUtil.MS_IN_MINUTE,
		ZOOM_4_1_HOUR: Timeline.tlDateUtil.MS_IN_HOUR,
		ZOOM_5_3_HOURS: 3 * Timeline.tlDateUtil.MS_IN_HOUR,
		ZOOM_6_6_HOURS: 6 * Timeline.tlDateUtil.MS_IN_HOUR,
		ZOOM_7_12_HOURS: 12 * Timeline.tlDateUtil.MS_IN_HOUR,
		ZOOM_8_1_DAY: Timeline.tlDateUtil.MS_IN_DAY,
		ZOOM_9_7_DAYS: 7 * Timeline.tlDateUtil.MS_IN_DAY,
		ZOOM_10_1_MONTH: 30 * Timeline.tlDateUtil.MS_IN_DAY,
		ZOOM_11_3_MONTH: 90 * Timeline.tlDateUtil.MS_IN_DAY,
		ZOOM_12_6_MONTH: 180 * Timeline.tlDateUtil.MS_IN_DAY,
		ZOOM_13_1_YEAR: 365 * Timeline.tlDateUtil.MS_IN_DAY,
		zoomTimeValue: 6 * Timeline.tlDateUtil.MS_IN_HOUR,
		zoomPxValue: 80,
		zoomXValue: 1,
		zoom: 7,
		currentDate: '',
		currentDatePos: null,
		timelineStartMs: 0,
		timelineEndMs: 0,
		timelineActive: true,
		timeOut: null,
		setDateInterval: null,
		$timeBlockEl: null,
		$timelineContainerEl: null,
		$timelineContentEl: null,
		$zoomPlusEl: null,
		$zoomMinusEl: null,
		$startTimeLine: null,
		$stopTimeLine: null,
		dateTimerIntervalMS: 3000,
		activeNewsElementTimeStamp: null,
		ArrayOfElementInTimeLine: null,
		arrayNewsElementInTimeLine: null,
		arrayNewsElements: null,

		init: function (selector, config) {
			that.createBlockMarkup(selector);
			that.activateDraggable();
			that.createTimeLine(config);
			that.timelineEventHandler();
			that.getUnits(config);
		},
		setDate: function (date) {
			var oldDate = Timeline.tlDateUtil.timeStamp(that.currentDate);
			var newDate = new Date(date).getTime();
			that.renderDateLabels(oldDate, newDate);
			that.datesBetweenRange(that.arrayNewsElements, false, false);
		},
		setNews: function (data) {
			that.arrayNewsElements = data;
			that.datesBetweenRange(that.arrayNewsElements, false, false);
		},
		renderDateLabels: function (oldDate, newDate) {
			if (oldDate === newDate) {
				return false;
			}
			var changeTime = oldDate - newDate;
			var changePx = parseInt(changeTime * that.zoomPxValue / that.zoomTimeValue, 10);
			var dragBlockMovePart = that.$timelineContainerEl.width() / 14 *5;
			if ((dragBlockMovePart - Math.abs(changePx)) > 0) {
				that.repaintElementAfterDrag(changePx, '+=', changePx, changePx);
			}
			else {
				that.currentDate = newDate;
				var timelineRange = Timeline.tlDateUtil.newCurrentRange(that.currentDate,
					that.zoomPxValue, that.zoomTimeValue, that.currentDatePos);
				that.repaintElementInTimeLine(that.currentDate, timelineRange);
			}
		},
		startDateTimer: function () {
			that.setDateInterval = setInterval(function () {
				var newDateObj = that.getCurrentDateObj();
				var oldDate = newDateObj.date;
				var timeRange = newDateObj.rangeMs;
				var newDate = new Date(oldDate).getTime() + timeRange;
				Timeline.setDate(newDate);
			}, that.dateTimerIntervalMS);
		},
		startTimeLine: function () {
			clearInterval(that.setDateInterval);
			that.startDateTimer();
			that.timelineActive = true;
		},
		stopTimeLine: function () {
			clearInterval(that.setDateInterval);
			that.timelineActive = false;
		},
		getCurrentDateObj: function () {
			var currentDateObj = {};
			currentDateObj.date = that.currentDate;
			currentDateObj.rangeMs = that.zoomTimeValue;
			return currentDateObj;
		},
		startTimeOut: function () {
			if (that.setDateInterval && that.timelineActive) {
				clearInterval(that.setDateInterval);
				that.startDateTimer();
			}
		},
		createBlockMarkup: function (selector) {
			selector.append(Timeline.TemplateObj.markupMain);
		},
		activateDraggable: function () {
			$('#tl-container').draggable({
				axis: 'x',
				scroll: true
			});
		},
		createTimeLine: function (configObj) {
			var config;
	
			config = configObj || {
				dateStart: '2014-01-01'
			};
			that.currentDate = new Date(config.dateStart).getTime();

			that.$timelineContainerEl = $('#tl-container');
			that.$timelineContentEl = $('#content');
			that.currentDatePos = that.$timelineContainerEl.width() / 2;
			console.log('that.currentDatePos - ' + that.currentDatePos);
			that.createTimeLineCurrentElement();

			that.timelineZoom();
			that.$timeBlockEl = $('#time');
			that.$zoomPlusEl = $('.zoom-plus');
			that.$zoomMinusEl = $('.zoom-minus');
			that.$startTimeLine = $('.start-time-line');
			that.$stopTimeLine = $('.stop-time-line');
			that.ArrayOfElementInTimeLine = $('.date-day-element, .date-element, .date-year-element, .date-month-element');
			$('.tl-container-wrap').css('marginLeft', parseInt($('.tl-container-wrap').css('marginLeft'),10));

		},
		createTimeLineElement: function (bufTime, bufPos) {
			var $el = $('[data-time-stamp="' + Timeline.tlDateUtil.timeStamp(bufTime) + '"]');
			var newElementClassName = '';
			var newElemHTMLValue = '';
			var minutes = Timeline.tlDateUtil.minuteReductionToType(Timeline.tlDateUtil.minutesNumber(bufTime));
			var monthNumber = Timeline.tlDateUtil.monthNumber(bufTime);
			var dateNumber = Timeline.tlDateUtil.dateNumber(bufTime);
			var hoursNumber = Timeline.tlDateUtil.hoursNumber(bufTime);
			var minutesNumber = Timeline.tlDateUtil.minutesNumber(bufTime);
			var monthName = that.MONTH_NAME[Timeline.tlDateUtil.monthNumber(bufTime)];
			if (!$el.length) {
				switch (true) {
				case (monthNumber === 0 && dateNumber === 1 && hoursNumber === 0 && minutesNumber === 0):
					newElementClassName = that.CLASS_NAME.yearElement;
					newElemHTMLValue = Timeline.tlDateUtil.yearNumber(bufTime) + '<br>' + that.MONTH_NAME[0];
					break;
				case (dateNumber === 1 && hoursNumber === 0 && minutesNumber === 0):
					newElementClassName = that.CLASS_NAME.monthElemnt;
					newElemHTMLValue = monthName;
					break;
				case (hoursNumber === 0  && minutesNumber === 0):
					newElementClassName = that.CLASS_NAME.dayElement;
					newElemHTMLValue = Timeline.tlDateUtil.dateNumber(bufTime) + ' ' +
						that.DAY_IN_WEEK[Timeline.tlDateUtil.dayInWeekNumber(bufTime)] + '<br>' + monthName;
					break;
				default :
					newElementClassName = that.CLASS_NAME.element;
					newElemHTMLValue =  Timeline.tlDateUtil.hoursNumber(bufTime) + '.' + minutes;
					break;
				}
				$('<div class="' + newElementClassName + '" data-time-stamp="' + Timeline.tlDateUtil.timeStamp(bufTime) + '">' +	newElemHTMLValue + '</div>')
					.css('left', bufPos + 'px')
					.appendTo('#time');
			} else {
				$el.css('left', bufPos + 'px');
			}
		},
		createTimeLineCurrentElement: function () {
			$('<div class="current-date">' + Timeline.tlDateUtil.dateLiteral(that.currentDate) + '</div>')
				.appendTo('.tl-wraper');
		},
		dataForTimeLine: function (rangeInSec, rangeInPixel) {
			var offsetFromCurrentDate = {};
			
			offsetFromCurrentDate.currentTime = Timeline.tlDateUtil.currentDayMsOnly(that.currentDate);
			offsetFromCurrentDate.offsetInSecBack = offsetFromCurrentDate.currentTime % rangeInSec;
			offsetFromCurrentDate.offsetInPixelBack = parseInt(rangeInPixel / rangeInSec *
				offsetFromCurrentDate.offsetInSecBack, 10);
			offsetFromCurrentDate.offsetInSecForward = rangeInSec - offsetFromCurrentDate.offsetInSecBack;
			offsetFromCurrentDate.offsetInPixelForward = rangeInPixel - offsetFromCurrentDate.offsetInPixelBack;

			var numberOfDay = 0;
			var timeInDay = 0;
			if (that.zoom === 9) {
				// zoom for week time interval
				numberOfDay = Timeline.tlDateUtil.dayInWeekNumber(that.currentDate);
				timeInDay = Timeline.tlDateUtil.currentDayMsOnly(that.currentDate);
				offsetFromCurrentDate.offsetInSecBack = timeInDay + (numberOfDay * 24 * 60 * 60 * 1000);
				offsetFromCurrentDate.offsetInSecForward = rangeInSec - offsetFromCurrentDate.offsetInSecBack;
				offsetFromCurrentDate.offsetInPixelBack = parseInt(rangeInPixel / rangeInSec *
				offsetFromCurrentDate.offsetInSecBack, 10);
				offsetFromCurrentDate.offsetInPixelForward = rangeInPixel - offsetFromCurrentDate.offsetInPixelBack;
			}

			if (that.zoom >= 10) {
				var timeStampStartMonth = new Date(that.currentDate);
				var fullPeriod = parseInt(timeStampStartMonth.getMonth() / that.zoomXValue, 10);
				timeStampStartMonth.setUTCMonth(fullPeriod * that.zoomXValue);
				timeStampStartMonth.setUTCDate(1);
				timeStampStartMonth = timeStampStartMonth - Timeline.tlDateUtil.currentDayMsOnly(timeStampStartMonth);
				var timeStampEndMonth = new Date(that.currentDate);
				timeStampEndMonth.setUTCMonth((fullPeriod + 1) * that.zoomXValue);
				timeStampEndMonth.setUTCDate(1);
				timeStampEndMonth = timeStampEndMonth - Timeline.tlDateUtil.currentDayMsOnly(timeStampEndMonth);

				offsetFromCurrentDate.offsetInSecBack = that.currentDate - timeStampStartMonth;
				offsetFromCurrentDate.offsetInSecForward = timeStampEndMonth - that.currentDate;
				var secRange = offsetFromCurrentDate.offsetInSecBack + offsetFromCurrentDate.offsetInSecForward;
				var pixelRange = (secRange) * rangeInPixel / rangeInSec;

				offsetFromCurrentDate.offsetInPixelBack = parseInt(pixelRange / secRange *
				offsetFromCurrentDate.offsetInSecBack, 10);
				offsetFromCurrentDate.offsetInPixelForward = pixelRange - offsetFromCurrentDate.offsetInPixelBack;

			}

			return offsetFromCurrentDate;
		},
		renderTimeLineDateLabel: function (zoomTimeValue, zoomPxValue) {
			var bufObject = that.dataForTimeLine(zoomTimeValue, zoomPxValue);
			var bufOffsetInPixelForward = that.currentDatePos + bufObject.offsetInPixelForward;
				// bufAfterPos - variable with pixel position of element after current date
			var bufOffsetInSecForward = Timeline.tlDateUtil.timeStamp(that.currentDate) + bufObject.offsetInSecForward;
				// bufAfter - variable with time value of element after current date
			var bufOffsetInPixelBack = that.currentDatePos - bufObject.offsetInPixelBack;
				// bufAfterPos - variable with pixel position of element before current date
			var bufOffsetInSecBack = Timeline.tlDateUtil.timeStamp(that.currentDate) - bufObject.offsetInSecBack;

			if (that.zoom >= 10) {
				for (var inz = 1, knz = parseInt(that.currentDatePos / zoomPxValue, 10) + 1; inz < knz; inz++) {
					that.createTimeLineElement(bufOffsetInSecForward, bufOffsetInPixelForward);
					that.createTimeLineElement(bufOffsetInSecBack, bufOffsetInPixelBack);
					var zoomTimeValueForward = new Date(bufOffsetInSecForward);
					zoomTimeValueForward.setUTCMonth(zoomTimeValueForward.getUTCMonth() + that.zoomXValue);
					var zoomPxForward = (zoomTimeValueForward - bufOffsetInSecForward) * zoomPxValue / zoomTimeValue;
					bufOffsetInSecForward = zoomTimeValueForward;
					bufOffsetInPixelForward += zoomPxForward;
					var zoomTimeValueback = new Date(bufOffsetInSecBack);
					zoomTimeValueback.setUTCMonth(zoomTimeValueback.getUTCMonth() - that.zoomXValue);
					var zoomPxBack = (bufOffsetInSecBack - zoomTimeValueback) * zoomPxValue / zoomTimeValue;
					bufOffsetInSecBack = zoomTimeValueback;
					bufOffsetInPixelBack -= zoomPxBack;
				}
			} else {
				for (var inx = 1, knx = parseInt(that.currentDatePos / zoomPxValue, 10) + 1; inx < knx; inx++) {
					that.createTimeLineElement(bufOffsetInSecForward, bufOffsetInPixelForward);
					that.createTimeLineElement(bufOffsetInSecBack, bufOffsetInPixelBack);
					bufOffsetInSecForward += zoomTimeValue;
					bufOffsetInPixelForward += zoomPxValue;
					bufOffsetInSecBack -= zoomTimeValue;
					bufOffsetInPixelBack -= zoomPxValue;
				}
			}
			that.$timelineContainerEl.css('left', '0');
		},
		removeElementOutTimeStamp: function (timeStampStart, timeStampEnd) {
			that.ArrayOfElementInTimeLine = $('.date-day-element, .date-element, .date-year-element, .date-month-element');
			that.ArrayOfElementInTimeLine.each(function() {
				var elementTimeStamp = $(this).data('timeStamp');
				if (elementTimeStamp < timeStampStart || elementTimeStamp > timeStampEnd) {
					$(this).remove();
				}
			});
		},
		timelineEventHandler: function () {
			
			// drag
			var bufPosPx;
			var bufPosPxEnd;
			var lastPxPosition = 0;
			var interval;
			var parentOffsetLeft;
			// var needRepaint = false;
			that.$timelineContainerEl.on( 'dragstart', function( event, ui ) {
				parentOffsetLeft = $('.tl-container-wrap').offset();
				parentOffsetLeft = parseInt(parentOffsetLeft.left, 10);
				lastPxPosition =  parseInt(that.$timelineContainerEl.css('left'), 10);
				that.$timelineContainerEl.stop();
				interval = setInterval(function () {
					lastPxPosition = parseInt(that.$timelineContainerEl.css('left'), 10);
				}, 200);
				clearInterval(that.setDateInterval);
			} );
			that.$timelineContainerEl.on( 'dragstop', function( event, ui ) {
				event.stopPropagation();
				clearInterval(interval);
				bufPosPxEnd = parseInt(that.$timelineContainerEl.css('left'), 10);
				var part14OfDragBlock = parseInt(that.$timelineContainerEl.width() / 14, 10);
				var leftAction = '';
				var leftValue = '';
				var leftMSValue = 100;
				if (bufPosPxEnd >= part14OfDragBlock * 5) {
					bufPosPx = part14OfDragBlock * 5;
					leftValue = bufPosPx;
					leftMSValue = bufPosPx;
				} else if (bufPosPxEnd <= -(part14OfDragBlock * 5)) {
					bufPosPx = -(part14OfDragBlock * 5);
					leftValue = bufPosPx;
					leftMSValue = bufPosPx;
				} else {
					leftMSValue = bufPosPxEnd - lastPxPosition;
					leftValue = parseInt(leftMSValue * 0.6, 10);
					bufPosPx = bufPosPxEnd + leftValue;
					leftAction = '';
				}

				that.$timelineContainerEl.css('left', 0 + 'px');
				that.repaintElementAfterDrag(bufPosPx, leftAction, bufPosPx, leftMSValue, bufPosPxEnd, parentOffsetLeft);
			} );

			that.$timelineContainerEl.click(function (event){
				event.preventDefault();
				$('.tl-container-wrap').offset({left: parentOffsetLeft});
				return false;
			});

			// resize
			$(window).resize(function () {
				var currentDatePos = that.$timelineContainerEl.width() / 2;
				that.currentDatePos = currentDatePos;
				that.repaintContentAndTimeBlock(true, false);
			});

			// zoom
			that.$zoomPlusEl.click(function () {
				if ((that.zoom - 1) >= 1) {
					that.zoom -= 1;
					that.zoomElementClickHandler();
				}
			});
			that.$zoomMinusEl.click(function () {
				if ((that.zoom + 1) <= 13) {
					that.zoom += 1;
					that.zoomElementClickHandler();
				}
			});

			// play or stop timeline
			that.$startTimeLine.click(function () {
				that.startTimeLine();
				that.$startTimeLine.addClass('active');
			});
			that.$stopTimeLine.click(function () {
				that.stopTimeLine();
				that.$startTimeLine.removeClass('active');
			});
		},
		repaintElementAfterDrag: function (bufPosPx, leftAction, leftValue, leftMSValue, bufPosPxEnd, parentOffsetLeft) {
			var newCurrentDate;
			that.startTimeOut();
			if (bufPosPxEnd) {
				that.$timelineContainerEl.css('left', bufPosPxEnd + 'px');
			}
			if (parentOffsetLeft) {
				$('.tl-container-wrap').offset({left: parentOffsetLeft});
			}
			that.$timelineContainerEl.animate({
				left: leftAction + leftValue + 'px'
			}, 100 + Math.abs(leftMSValue), 'easeOutCubic', function() {
				newCurrentDate = Timeline.tlDateUtil.newCurrentDateTimeStamp(that.currentDate,
					that.zoomPxValue, that.zoomTimeValue, bufPosPx);
				that.currentDate = newCurrentDate;
				that.repaintContentAndTimeBlock(true, false);
				that.$timelineContainerEl.css('left', 0 + 'px');
			});
		},
		zoomElementClickHandler: function () {
			that.ArrayOfElementInTimeLine = $('.date-day-element, .date-element, .date-year-element, .date-month-element');
			that.ArrayOfElementInTimeLine.remove();
			that.timelineZoom();
		},
		repaintElementInTimeLine: function (currentDate, rangeTimeLineObj) {
			that.removeElementOutTimeStamp(rangeTimeLineObj.timelineStartMs,
				rangeTimeLineObj.timelineEndMs);
			that.renderTimeLineDateLabel(that.zoomTimeValue, that.zoomPxValue);
			$('.current-date').html(Timeline.tlDateUtil.dateLiteral(that.currentDate));
			that.timelineStartMs = rangeTimeLineObj.timelineStartMs;
			that.timelineEndMs = rangeTimeLineObj.timelineEndMs;
		},
		repaintElementAfterZoom: function (zoomTimeValue) {
			that.zoomTimeValue = zoomTimeValue;
			that.repaintContentAndTimeBlock(true, true);
		},
		timelineZoom: function () {
			switch (that.zoom) {
			case 1:
				that.repaintElementAfterZoom(that.ZOOM_1_5_MINUTE);
				break;
			case 2:
				that.repaintElementAfterZoom(that.ZOOM_2_15_MINUTE);
				break;
			case 3:
				that.repaintElementAfterZoom(that.ZOOM_3_30_MINUTE);
				break;
			case 4:
				that.repaintElementAfterZoom(that.ZOOM_4_1_HOUR);
				break;
			case 5:
				that.repaintElementAfterZoom(that.ZOOM_5_3_HOURS);
				break;
			case 6:
				that.repaintElementAfterZoom(that.ZOOM_6_6_HOURS);
				break;
			case 7:
				that.repaintElementAfterZoom(that.ZOOM_7_12_HOURS);
				break;
			case 8:
				that.repaintElementAfterZoom(that.ZOOM_8_1_DAY);
				break;
			case 9:
				that.repaintElementAfterZoom(that.ZOOM_9_7_DAYS);
				break;
			case 10:
				that.zoomXValue = 1;
				that.repaintElementAfterZoom(that.ZOOM_10_1_MONTH);
				break;
			case 11:
				that.zoomXValue = 3;
				that.repaintElementAfterZoom(that.ZOOM_11_3_MONTH);
				break;
			case 12:
				that.zoomXValue = 6;
				that.repaintElementAfterZoom(that.ZOOM_12_6_MONTH);
				break;
			case 13:
				that.zoomXValue = 12;
				that.repaintElementAfterZoom(that.ZOOM_13_1_YEAR);
				break;
			default:
				that.repaintElementAfterZoom(that.ZOOM_8_1_DAY);
				break;
			}
		},
		createNewsElement: function (dataElement, topPosPx, zIndex, animateTop, animateLeft) {
			var $el = $('[data-start-date="' + dataElement.time + '"]');
			var dateLiteral = '';
			var positionOfElement = that.positionOfContentElement(dataElement.time);
			var animateTime = 200;
			if (!$el.length) {
				dateLiteral = Timeline.tlDateUtil.dateLiteral(dataElement.time);
				$el = Timeline.TemplateObj.timeBlockElement(dataElement.id,
					dataElement.title, dataElement.img, dataElement.time,
					positionOfElement, dateLiteral);
				that.$timelineContentEl.append($el);
				$el = $('[data-start-date="' + dataElement.time + '"]');
				$el.click(that.newsElementClickHandler);
				if (parseInt(dataElement.time, 10) === that.currentDate) {
					that.arrayNewsElementInTimeLine.removeClass('current-news');
					$el.addClass('current-news');
					that.activeNewsElementTimeStamp = parseInt(dataElement.time, 10);
				}
			}
			var animate = {};
			var css = {};
			if (animateTop && animateLeft) {
				animate.left = positionOfElement + 'px';
				animate.top = topPosPx + 'px';
				css.zIndex = zIndex;
			} else if (animateTop) {
				animate.top = topPosPx + 'px';
				css.left = positionOfElement + 'px';
				css.zIndex = zIndex;
			} else {
				css.top = topPosPx + 'px';
				css.left = positionOfElement + 'px';
				css.zIndex = zIndex;
			}
			$el.animate(animate, animateTime);
			$el.css(css);
		},
		positionOfContentElement: function (startTime) {
			var rangeInMs = startTime - that.currentDate;
			var offsetInPx = parseInt(rangeInMs / that.zoomTimeValue * that.zoomPxValue, 10);
			var pos = that.currentDatePos + offsetInPx;
			return pos;
		},
		datesBetweenRange: function (array, animateTop, animateLeft) {
			if (array === null) {
				return false;
			}
			var k = array.length;
			var bufArrayofNews = [];
			if (array instanceof Array) {
				for (var i = 0; i < k; i++) {
					if (array[i].time > that.timelineStartMs &&
						array[i].time < that.timelineEndMs) {
						bufArrayofNews.push(array[i]);
					}
				}
			} else {
				bufArrayofNews.push(array);
			}

			if (bufArrayofNews.length >= 0) {
				that.renderTimeLineNewsElement(bufArrayofNews, animateTop, animateLeft);
			}
		},
		renderTimeLineNewsElement: function (bufArrayofNews, animateTop, animateLeft) {
			that.removeNewsElement(that.timelineStartMs, that.timelineEndMs);
			that.arrayNewsElementInTimeLine = $('.time-block-element');
			that.arrayNewsElementInTimeLine.removeClass('current-news');
			if (that.activeNewsElementTimeStamp) {
				$('[data-start-date="' + that.activeNewsElementTimeStamp + '"]').addClass('current-news');
			}
			var startTime = that.timelineStartMs;
			var endTime = that.timelineEndMs;
			var bufTime = that.timelineStartMs + (that.zoomTimeValue * 2);
			while (bufTime < endTime) {
				var topPosPx = 15;
				var zIndex = 1;
				for (var j = 0, n = bufArrayofNews.length; j < n; j++) {
					if (topPosPx >= 95) {
						topPosPx = 15;
						zIndex = 1;
					}
					if (bufArrayofNews[j].time > startTime && bufArrayofNews[j].time < bufTime) {
						that.createNewsElement(bufArrayofNews[j], topPosPx, zIndex, animateTop, animateLeft);
						topPosPx += 20;
						zIndex += 1;
					}
				}
				startTime += that.zoomTimeValue * 2;
				bufTime += that.zoomTimeValue * 2;
			}
		},
		removeNewsElement: function(timeStampStart, timeStampEnd) {
			that.arrayNewsElementInTimeLine = $('.time-block-element');
			var elementStartDate;
			that.arrayNewsElementInTimeLine.each(function() {
				elementStartDate = $(this).data('startDate');
				if (elementStartDate < timeStampStart || elementStartDate > timeStampEnd) {
					$(this).remove();
				}
			});
		},
		newsElementClickHandler: function () {
			var startDate = $(this).data('startDate');
			that.arrayNewsElementInTimeLine = $('.time-block-element');
			that.arrayNewsElementInTimeLine.removeClass('current-news');
			$(this).addClass('current-news');
			that.activeNewsElementTimeStamp = parseInt(startDate, 10);
			that.setDate(that.activeNewsElementTimeStamp);
		},
		repaintContentAndTimeBlock: function (animateTop, animateLeft) {
			var timelineRange = Timeline.tlDateUtil.newCurrentRange(that.currentDate,
				that.zoomPxValue, that.zoomTimeValue, that.currentDatePos);
			that.repaintElementInTimeLine(that.currentDate, timelineRange);
			that.datesBetweenRange(that.arrayNewsElements, animateTop, animateLeft);
			that.startTimeOut();
		},
		getUnits: function(config){
			var that = this;
			$.ajax({
				url: config.getApprovedUnits
			}).done(function(data) {
				console.log(data);
				that.setNews(data);
			});
		}
	};
	var that = process;
	return {
		init: that.init,
		setNews: that.setNews,
		setDate: that.setDate,
		startTimeLine: that.startTimeLine,
		stopTimeLine: that.stopTimeLine
	};
})();





