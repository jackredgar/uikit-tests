var webdriver = require('selenium-webdriver');

var browser_name = new webdriver.Builder();

let browser = browser_name.withCapabilities(webdriver.Capabilities.chrome()).build();

browser.get('http:/www.google.com');

var promise = browser.getTitle();

promise.then(function(title) 

{

console.log(title);

});

browser.quit();