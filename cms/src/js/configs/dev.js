var UT = window.UT || {},
    host = 'http://localhost:3000/';

//Configuration object
UT.Config = {
    //Path for getting articles
    getUnapprovedArticles: host + 'temp/articles',
    getApprovedArticles: host + 'unit',
    //Path for getting locale
    localeBaseURL: 'src/locale/',
    //default locale
    projectName: 'Ukraine Timeline',
    localeDefault: 'en_US',
    facebookAppId: 1525144001089909
};