$(document).ready(function() {
	$('.form-article').submit(function(evt) {
		evt.preventDefault();
		var serializedData = $(this).serializeArray(),
			serializedObject = {};

		$.each(serializedData, function() {
			if (serializedObject[this.name]) {
				if (!serializedObject[this.name].push) {
					serializedObject[this.name] = [o[this.name]];
				}
				serializedObject[this.name].push(this.value || '');
			} else {
				serializedObject[this.name] = this.value || '';
			}
		});

		$.ajax({
			url: 'http://localhost:3000/temp/articles',
			type: 'POST',
			data: {
				mediaContent: serializedObject['media-content'],
				incidentTime: serializedObject['incident-time'],
				incidentType: serializedObject['incident-type'],
				incidentCoordinatesLat: serializedObject['incident-coordinates-lat'],
				incidentCoordinatesLon: serializedObject['incident-coordinates-lon'],
				incidentTitle: serializedObject['incident-title']
			}
		}).done(function(res) {
			console.log('Res: ', res);
		});
	});
})