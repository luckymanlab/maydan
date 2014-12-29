var Timeline = window.Timeline || {};
Timeline.TemplateObj = {
	markupMain: '' +
	'<div class="tl-wraper">' +
		'<div class="tl-container-wrap">' +
			'<div id="tl-container">' +
				'<div id="content"></div>' +
				'<div id="time"></div>' +
			'</div>' +
			'<div class="content-bg-block"></div>' +
			'<div class="time-bg-block"></div>' +
		'</div>' +
		'<div class="tl-control">' +
			//'<span class="back-to-start"></span>' +
			'<span class="zoom-plus"></span>' +
			'<span class="zoom-minus"></span>' +
			'<span class="start-time-line"></span>' +
			'<span class="stop-time-line"></span>' +
		'</div>' +
		'<div class="tl-sep-line"></div>' +
	'</div>',
	timeBlockElement: function (id, title, img, startDate, positionOfElement, dateLiteral) {
		var element;
		var image = '';
		if (img) {
			image = '<img src="' + img + '" alt="">';
		}
		element = '' +
		'<div class="time-block-element" id="' + id + '" data-start-date="' + startDate + '"' +
		'" style="left: ' + positionOfElement + 'px">' +
			image +
			'<p class="time-of-news">' + dateLiteral + '<p>' +
			'<p class="time-block-title">' + title + '</p>' +
		'</div>';
		return element;
	},
};