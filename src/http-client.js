var http = require('http');
var https = require('https');

function httpGet(url) {
    return new Promise((resolve, reject) => {
        var lib = url.startsWith('https') ? https : http;
        var request = lib.get(url, (response) => {
            if (response.statusCode < 200 || response.statusCode > 299) {
                reject(new Error('Failed to load ' + url + ', status code: ' + response.statusCode));
            }

            var body = [];
            response.on('data', (chunk) => body.push(chunk));
            response.on('end', () => {
                resolve(JSON.parse(body.join('')));
            });
        });

        request.on('error', (err) => reject(err))
    });
};

module.exports = {
    get : httpGet
};