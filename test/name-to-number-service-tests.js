var nameToNumberService = require('../src/name-to-number-service');
var chai = require('chai');
chai.should();

describe("Name to number service", function() {
    describe("with 4 buckets", function() {
        it("puts Alice in the first", function() {
            var buckets = 4;
            var name = "Alice";
            var expectedBucket = 1;

            var actualBucket = nameToNumberService.generateNumber(name, buckets);

            actualBucket.should.equal(expectedBucket);
        });
    });
});