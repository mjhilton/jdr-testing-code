var assert = require('assert');

const lettersInAlphabet = 26;
const alphabet = ['a', 'b', 'c', 'd', 'e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

// Takes in a name, and a number of 'buckets' to split the alphabet up into. Any remainder goes in the last bucket.
// Using the first letter of the name, figures out which bucket the name fits in.
// eg: 4 buckets:
// 1 ['a','b','c','d','e','f']
// 2 ['g','h','i','j','k','l']
// 3 ['m','n','o','p','q','r']
// 4 ['s','t','u','v','w','x','y','z']
//
// Therefore generateNumber('Aaron', 4) returns 1; generateNumber('Matt', 4) returns 3.
function generateNumber(name, numberOfBuckets) {
    assert.ok(numberOfBuckets <= lettersInAlphabet, 'numberOfBuckets must be equal to or less than 26');
    assert.ok(typeof(name) === 'string', 'name must be a string');
    assert.ok(name.length > 0, 'name must have at least 1 letter');

    var bucketSize = Math.floor(lettersInAlphabet / numberOfBuckets);
    var firstLetterInName = name[0].toLowerCase();
    var firstLetterLocation = alphabet.indexOf(firstLetterInName) + 1;
    var firstLetterBucket = Math.min(numberOfBuckets, Math.ceil(firstLetterLocation / bucketSize));

    return firstLetterBucket;
};

module.exports = {
    generateNumber: generateNumber
};