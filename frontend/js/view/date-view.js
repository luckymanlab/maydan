var UT = window.UT || {};

UT.DateView = Backbone.View.extend({
	initialize: function(options) {
		var self = this;

		self.model = options.model;
		self.model.on('change', this.render, this);
		self.date = self.$el.find('#date-picker');
		self.progressBar = self.$el.find('.progress-bar');
		self.progress = self.$el.find('.progress');
		self.datepicker = self.date.datepicker().on('changeDate', function(e) {
			var d = new Date(e.date)
			//d.setMonth(d.getMonth() + 1);
			self.model.setDate(d);
			self.datepicker.hide();
		}).data('datepicker');
		self.render();
	},
	events: {
		'click .progress'  : 'progressBarClickHandler',
		'click #prev-day'  : 'prevDayButtonClickHandler',
		'click #next-day'  : 'nextDayButtonClickHandler'
	},
	render: function () {
		this.date.text(this.model.getDateString());
		this.progressBar.text(this.model.getTimeString());
		this.progressBar.css('width', this.model.getDayProgress()+'%').attr('aria-valuenow',
			this.model.getDayProgress());
		this.datepicker.setValue(this.model.getDate());
	},
	progressBarClickHandler: function (e) {
		this.model.setDayProgress((e.pageX - this.progress.position().left) / this.progress.width() * 100);
	},
	prevDayButtonClickHandler: function (e) {
		var d = this.model.getDate();
		d.setDate(d.getDate() - 1);
		d.setHours(0, 0);
		this.model.setDate(d);
	},
	nextDayButtonClickHandler: function (e) {
		var d = this.model.getDate();
		d.setDate(d.getDate() + 1);
		d.setHours(0, 0);
		this.model.setDate(d);
	}
});
