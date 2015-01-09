var UT = window.UT || {},
	host = 'http://localhost:3000/';

//Configuration object
UT.Config = {
	//Path for saving articles
	saveArticlePath: host + 'temp/articles',
	getAllUnitTypes: host + 'unit-types',
	//Path for getting templates
	createArticleTemplate: 'templates/create-article-template.html',
	unitTypesTemplate: 'templates/unit-types-select-template.html',
	//Path for getting locale
	localeBaseURL: 'locale/',
	//default locale
	localeDefault: 'en_US',
	unitTypeFire: 'http://www.iconsearch.ru/uploads/icons/alcohol/32x32/burn.png',
	unitTypeWater: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRlJXpwEhahOPYE761huP_qVMrJI_-A4_XZY27lMOYzPXGIKMv',
	unitTypeAir: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS18lrXg9XchJ0io7Pbj8gWar71LetfYsF3CNOc_SpDh8FpFw-RmA',
	unitTypeLand: 'http://www.iconsearch.ru/uploads/icons/alcohol/32x32/burn.png',
	preloader: 'http://a-develop.ru/media/blog/56_preview.gif'
};