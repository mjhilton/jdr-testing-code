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

    var buckets = bucketiseAlphabet(numberOfBuckets);
    var searchForLetter = name[0].toLowerCase();
    
    var foundInBucket = null;
    for (var i = 0; i < buckets.length; i++) {
        if (buckets[i].indexOf(searchForLetter) !== -1)
            foundInBucket = i + 1;
    }

    return foundInBucket;
};

function bucketiseAlphabet(numberOfBuckets) {
    var numberOfLettersInBucket = Math.floor(lettersInAlphabet / numberOfBuckets);
    var buckets = []
    
    // Split the alphabet up into buckets
    for (var currentBucket = 1; currentBucket <= numberOfBuckets; currentBucket++) {
        var alphabetStartIndex = (currentBucket - 1) * numberOfLettersInBucket;

        buckets[currentBucket - 1] = alphabet.slice(alphabetStartIndex, alphabetStartIndex + numberOfLettersInBucket);
    }

    // If there's any letters left at the end, add them to the last bucket
    if (lettersInAlphabet % numberOfBuckets !== 0) {
        var leftoverIndex = numberOfLettersInBucket * numberOfBuckets;
        var lastBucket = buckets[numberOfBuckets - 1];

        buckets[numberOfBuckets - 1] = lastBucket.concat(alphabet.slice(leftoverIndex, lettersInAlphabet));
    }

    return buckets;
};

module.exports = {
    generateNumber: generateNumber
};