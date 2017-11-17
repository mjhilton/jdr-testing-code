var app = require('../../app');
var chromedriver = require('chromedriver');
var webdriver = require('selenium-webdriver');
var chai = require('chai');
var db = require("../../src/data-service");

var by = webdriver.By;
var until = webdriver.until;
chai.should();

var driver;
before("Start Chrome and navigate to homepage", function() {
    driver = new webdriver.Builder()
        .forBrowser('chrome')
        .build();

    return driver.get("http://localhost:4000/");
});

afterEach("Reset browser", function() {
    return driver.get("http://localhost:4000/");
});

afterEach("Clear database", function() {
    db.clear();
})

describe("Spinning up our app", function() {
    it("should be greeted with today's date", function() {
        return driver.findElement(by.id("todaysDate"))
            .then((element) => element.getText())
            .then((dateText) => dateText.should.equal(new Date().toDateString()));
    });
});

describe("MatchMaker", function() {
    beforeEach("Initiate MatchMaker", function() {
        return driver.findElement(by.name("match")).then(m => m.click());
    });

    describe("when finding a Dog for Alice", function() {
        beforeEach(function() {
            return driver.findElement(by.name("ownerName"))
                .then(ownerName => ownerName.sendKeys("Alice"))
                .then(() => driver.findElement(by.css("option[value='Dog']")))
                .then(petType => petType.click())
                .then(() => driver.findElement(by.tagName("button")))
                .then(button => button.click());
        });

        it("should match her to a Beaglier", function() {
            return driver.findElement(by.name("matchResult"))
                .then(mr => driver.wait(until.elementIsVisible(mr)))
                .then(mr => mr.getText())
                .then(mrText => mrText.should.contain("Beaglier"));
        });

        it("should contain info about Beagliers", function() {
            return driver.findElement(by.name("petInfo"))
                .then(petInfo => driver.wait(until.elementIsVisible(petInfo)))
                .then(petInfo => petInfo.getText())
                .then(info => info.should.contain("Cavalier King Charles Spaniel"));
        });

        it("should link to Wikipedia", function() {
            return driver.findElement(by.name("infoSource"))
                .then(infoSource => driver.wait(until.elementIsVisible(infoSource)))
                .then(infoSource => infoSource.getText())
                .then(source => {
                    source.should.contain("wikipedia");
                    source.should.contain("Beaglier");
                });
        });
    });
});

describe("Randomiser", function() {
    describe("when randomly matching a pet", function() {
        beforeEach(function() {
            return driver.findElement(by.name("random"))
                .then(m => m.click())
                .then(() => driver.findElement(by.tagName("button")))
                .then(button => button.click())
                .then(() => driver.findElement(by.name("petInfo")))
                .then(petInfo => driver.wait(until.elementIsVisible(petInfo)))
        });

        it("should find a match", function() {
            return driver.findElement(by.name("matchResult"))
                .then(mr => driver.wait(until.elementIsVisible(mr)))
                .then(mr => mr.getText())
                .then(mrText => mrText.should.contain("Your perfect pet is a"));
        });

        it("should contain info about the Pet", function() {
            return driver.findElement(by.name("petInfo"))
                .then(petInfo => driver.wait(until.elementIsVisible(petInfo)))
                .then(petInfo => petInfo.getText())
                .then(info => info.should.be.a('string').that.is.not.empty);
        });

        it("should link to Wikipedia", function() {
            return driver.findElement(by.name("infoSource"))
                .then(infoSource => driver.wait(until.elementIsVisible(infoSource)))
                .then(infoSource => infoSource.getText())
                .then(source => source.should.contain("wikipedia"));
        });
    });
});

describe("History", function() {
    describe("after making one random request", function() {
        beforeEach(function() {
            return driver.findElement(by.name("random"))
                .then(m => m.click())
                .then(() => driver.findElement(by.tagName("button")))
                .then(button => button.click())
                .then(() => driver.findElement(by.name("petInfo")))
                .then(petInfo => driver.wait(until.elementIsVisible(petInfo)))
                .then(() => driver.findElement(by.linkText("History")))
                .then(history => driver.wait(until.elementIsVisible(history)))
                .then(history => history.click());
        });

        it("should contain one history entry", function() {
            return driver.wait(until.elementLocated(by.name("history")))
                .then(history => {
                    return driver.wait(until.elementIsVisible(history))
                })
                .then(history => {
                    return history.findElements(by.tagName("li"))
                })
                .then(historyItems => {
                    return historyItems.length.should.equal(1);
                });
        });
    });
});

after("Quit Chrome", function() {
    return driver.quit();
});