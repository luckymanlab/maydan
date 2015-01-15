var UT = window.UT || {},
    host = 'http://localhost:3000/';

//Configuration object
UT.Config = {
    //Path for getting articles
    getAllArticles: host + 'temp/articles',
    articlesListTemplate: 'src/templates/articles-list-template.html',
    articlePreviewTemplate: 'src/templates/article-preview-template.html',
    //Path for getting locale
    localeBaseURL: 'src/locale/',
    //default locale
    localeDefault: 'en_US'
};