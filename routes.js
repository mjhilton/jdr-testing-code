var nameNumberService = require('./src/name-to-number-service');
var petService = require('./src/pet-service');
var db = require('./src/data-service');

var express = require('express');

const numberOfPetsOfEachType = petService.numberOfBreedsOfEachType;
const petTypes = petService.petTypes;

module.exports = (app) => {
    app.use('/node_modules/angular', express.static(__dirname + '/node_modules/angular'));
    app.use('/node_modules/angular-route', express.static(__dirname + '/node_modules/angular-route'));

    app.get('/api/pets/generateMatch', (req, res) => {
        db.save({ "message": "Request to " + req.url, "time": new Date() });

        var ownerName = req.query.ownerName;
        var petType = req.query.petType

       var petMatch = petService.findMatch(ownerName, petType);

        res.json(petMatch);
    });

    app.get('/api/pets/random', (req, res) => {
        db.save({ "message": "Request to " + req.url, "time": new Date() });

        var pet = petService.findRandom();

        res.json(pet);
    });

    app.get('/api/pets/info/:petName', (req, res) => {
        var petName = req.params.petName;

        petService.getPetDetails(petName).then((result) => {
            res.json(result);
        }).catch((error) => {
            res.status(500).json(error.message);
        });
    });

    app.get('/api/history', function(req, res) {
        var keys = db.getKeys();
        var values = [];
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            var value = db.get(key);
            values.push(value);
        }
        res.send(values);
    });

    app.get('/public/angular', function(req, res) {
        res.sendfile('./node_modules/angular/angular.min.js');
    });
};