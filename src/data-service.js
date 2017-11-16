var config = require('../config');
var flatFile = require('flat-file-db');

var db = flatFile.sync(config.db);

function save(item) {
    var currentKeys = db.keys();
    var key = (currentKeys.length > 0) 
        ? parseInt(currentKeys[currentKeys.length - 1]) + 1
        : 1;

    db.put(key, item);

    return key;
};

function getKeys() {
    return db.keys();
}

function get(key) {
    return db.get(key);
};

function clear() {
    db.clear();
};

module.exports = {
    save: save,
    get: get,
    getKeys: getKeys,
    clear: clear
}