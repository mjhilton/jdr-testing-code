var environment = process.env.NODE_ENV || 'development';

var config;

if (environment === 'development')
    config = require('./config/development');
if (environment === 'test')
    config = require('./config/test');
if (environment === 'production')
    config = require('./config/production');

module.exports = config;