var nameToNumberService = require('../src/name-to-number-service');
var chai = require('chai');
chai.should();

describe("Name to number service", function() {
    describe("with 1 bucket", function() {
        var getBucket = (name) => nameToNumberService.generateNumber(name, 1);

        it("puts Jenny in the first", function() {
            getBucket("Jenny").should.equal(1);
        })
    });

    describe("with 4 buckets", function() {
        var getBucket = (name) => nameToNumberService.generateNumber(name, 4);

        it("puts Alice in the first", function() {
            getBucket("Alice").should.equal(1);
        });

        it("puts John in the second", function() {
            getBucket("John").should.equal(2);
        });

        it("puts Olli in the third", function() {
            getBucket("Olli").should.equal(3);
        });

        it("puts Zara in the fourth", function() {
            getBucket("Zara").should.equal(4);
        });
    });

    describe("with 26 buckets", function() {
        var getBucket = (name) => nameToNumberService.generateNumber(name, 26);

        it("puts Alice in the first", function() {
            getBucket("Alice").should.equal(1);
        });

        it("puts Bryce in the second", function() {
            getBucket("Bryce").should.equal(2);
        });

        it("puts Yolanie in the twenty fifth", function() {
            getBucket("Yolanie").should.equal(25);
        });

        it("puts Zara in the twenty sixth", function() {
            getBucket("Zara").should.equal(26);
        });
    });

    describe("with 27 buckets", function() {
        it("fails", function() {
            chai.expect(() => nameToNumberService.generateNumber("Alice", 27)).to.throw(/less than 26/);
        });
    });
});