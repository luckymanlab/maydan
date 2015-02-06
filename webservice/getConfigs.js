module.exports = (function() {
    var env = process.env.NODE_ENV;

    if(env === 'dev' || env === 'development') {
        return require('./configs/dev.js');
    } else if(env === 'prod' || env === 'production') {
        return require('./configs/prod');
    } else {
        return require('./configs/local');
    }
})();