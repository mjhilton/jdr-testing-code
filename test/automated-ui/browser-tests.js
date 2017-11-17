var app = require('../../app');
var chromedriver = require('chromedriver');
var webdriver = require('selenium-webdriver');
var chai = require('chai');

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

describe("Spinning up our app", function() {
    it("should be greeted with today's date", function() {
        return driver.findElement(by.id("todaysDate"))
            .then((element) => element.getText())
            .then((dateText) => dateText.should.equal(new Date().toDateString()));
    });
});

after("Quit Chrome", function() {
    return driver.quit();
});