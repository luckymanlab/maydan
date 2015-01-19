var UT = window.UT || {},
	host = 'http://localhost:3000/';

//Configuration object
UT.Config = {
	//Path for saving articles
	saveArticlePath: host + 'temp/articles',
	getAllUnitTypes: host + 'unit-types',
    getAllApprovedUnits: host + 'unit',
	//Path for getting templates
	createArticleTemplate: 'templates/create-article-template.html',
	unitTypesTemplate: 'templates/unit-types-select-template.html',
	alertTemplate: 'templates/alert-template.html',
	//Path for getting locale
	localeBaseURL: 'locale/',
	//default locale
	localeDefault: 'en_US',
	unitTypesImagePath: 'img/types/{ITEM_TYPE}.png',
	preloader: 'http://a-develop.ru/media/blog/56_preview.gif',
	defaultPosition: {
		lat: '50.4505879',
		lon: '30.523233300000015'
	}
};