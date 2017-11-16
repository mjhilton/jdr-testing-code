var httpClient = require('./http-client');
var nameNumberService = require('./name-to-number-service');

// Private data
const petInfoAPI = "https://juniordev-refactor.azurewebsites.net/api/Pets"
const pets = {
    "Dog": [
        "Beaglier", 
        "Husky",
        "Labrador",
        "Poodle"
    ],
    "Cat": [
        "British Shorthair",
        "Bengal",
        "Ragdoll",
        "Russian Blue"
    ],
    "Fish": [
        "Axolotl",
        "Red Lionfish",
        "Clownfish",
        "Seahorse"
    ]
};
const petTypes = Object.keys(pets);
const numberOfPetsOfEachType = pets[Object.keys(pets)[0]].length;

// Private functions
function getPet(petType, breedNumber) {
    return pets[petType][breedNumber - 1];
};

// Public functions
function getRandomPet() {
    var petNumber = Math.ceil(Math.random() * numberOfPetsOfEachType);
    var petType = petTypes[Math.floor(Math.random() * petTypes.length)];
    var petName = getPet(petType, petNumber);

    return {
        petType: petType,
        petName: petName
    };
};

function generateOwnerMatch(ownerName, petType) {
    var petNumber = nameNumberService.generateNumber(ownerName, numberOfPetsOfEachType);
    var petName = getPet(petType, petNumber);

    return { 
        ownerName: ownerName,
        petType: petType,
        petName: petName
    };
};

function getPetDetails(petType) {
    var url = petInfoAPI + "?petName=" + petType;
    return httpClient.get(url)
        .then(result => {
            // API returns pretty gross names, let's transform it into something nicer to consume
            return {
                info: result.AnimalInformation,
                image: result.Base64EncodedVisualDepiction,
                source: result.ReferenceSource
            };
        });
};

module.exports = {   
    findMatch: generateOwnerMatch,
    findRandom: getRandomPet,
    getPetDetails: getPetDetails
}