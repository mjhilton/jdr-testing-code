var petService = require('../src/pet-service');
var sinon = require('sinon');
var httpClient = require('../src/http-client');

describe('PetService', function() {
    describe('when retrieving pet details', function() {
        beforeEach(function() {
            sinon.stub(httpClient, 'get');
        });

        it('returns a nicely consumable JSON result', function() {
            var externalApiJsonResult = {
                "AnimalVariety": "Dog",
                "AnimalInformation": "Beagliers are beautiful",
                "ReferenceSource": "https://en.wikipedia.org/wiki/Beaglier",
                "Base64EncodedVisualDepiction": "base64dog"
            };

            httpClient.get.resolves(externalApiJsonResult);
           
            return petService.getPetDetails("Beaglier")
                .then(result => {
                    result.should.have.property("info").which.equals("Beagliers are beautiful");
                    result.should.have.property("source").which.equals("https://en.wikipedia.org/wiki/Beaglier");
                    result.should.have.property("image").which.equals("base64dog");
                });
        });

        afterEach(function() {
            httpClient.get.restore();
        });
    });
});