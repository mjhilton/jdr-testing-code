var app = require('../../app');
var httpClient = require('../../src/http-client');
var db = require('../../src/data-service');

var chai = require('chai');
chai.should();

describe("When requesting a dog match for Alice", function() {
    it("returns a Beaglier", function() {
        return httpClient.get("http://localhost:4000/api/pets/generateMatch?ownerName=Alice&petType=Dog")
            .then(result => {
                result.should.exist;
                result.should.have.property('petName').that.equals("Beaglier");
            });
    });
});

describe("When requesting a random pet match", function() {
    it("adds a single entry to the request history", function() {
        return httpClient.get("http://localhost:4000/api/pets/random")
            .then(function() {
                var keys = db.getKeys();
                keys.length.should.equal(1);
            });
    });
});

afterEach(function() {
    db.clear();
});