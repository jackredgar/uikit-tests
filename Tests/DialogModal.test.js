// Generated by Selenium IDE
const { Builder, By, Key, until, ExpectedConditions } = require('selenium-webdriver')
const assert = require('assert')
const { NoSuchElementError } = require('selenium-webdriver/lib/error')
require('dotenv').config()

describe('Dialog Modal', function() {
  this.timeout(30000)
  let driver
  let vars

  let env = process.env.ENVIRONMENT
  let LSG_URL = env == "QA" ? "https://axosbank-qa-sentry.outsystemsenterprise.com/AXOS_Reactive_LSG/" : "https://axosbank-dev-sentry.outsystemsenterprise.com/AXOS_Reactive_LSG/"
  let Component_URL = env == "QA" ? "https://axosbank-qa-sentry.outsystemsenterprise.com/AXOS_Reactive_LSG/PatternDetail?MenuCategoryId=8&MenuSubCategorId=92" : "https://axosbank-dev-sentry.outsystemsenterprise.com/AXOS_Reactive_LSG/PatternDetail?MenuCategoryId=8&MenuSubCategorId=92"

  let savedCookies = null;

  async function goToLSG(driver, componentURL) {
    await driver.get(LSG_URL)
    driver.manage().window().maximize();
    if (savedCookies != null) {
      for (let i = 0; i < savedCookies.length; i++) {
        // console.log("individual cookie", savedCookies[i])
        await driver.manage().addCookie(savedCookies[i]);
      }
      await driver.navigate().to(componentURL);
    } else {
      await driver.findElement(By.css("#Input_UsernameVal")).click()
      await driver.findElement(By.css("#Input_UsernameVal")).sendKeys("LSG_Dev")
      await driver.findElement(By.css("#Input_PasswordVal")).click()
      await driver.findElement(By.css("#Input_PasswordVal")).sendKeys("pwd123")
      await driver.findElement(By.xpath("//*[@id='b6-Button']/button")).click()
      await driver.findElement(By.xpath("//*[@id='b2-Content']/h1/div[2]/span"))
      await driver.manage().getCookies().then(function(cookies) {
        // console.log('cookie details => ', cookies);
        savedCookies = cookies; 
      });
      await driver.navigate().to(componentURL);
    }
  }

  beforeEach(async function() {
    driver = await new Builder().forBrowser('chrome').build()
    vars = {}
  })
  afterEach(async function() {
    await driver.quit();
  })

  it('OpenClose', async function() {
    await driver.manage().setTimeouts({ implicit: 2000 });
    await goToLSG(driver, Component_URL);

    await driver.findElement(By.xpath("//*[contains(text(), 'Open Popup - Text')]")).click()
    await driver.findElement(By.css('.popup-backdrop > .popup-dialog'))
    await driver.findElement(By.css(".popup-backdrop > .popup-dialog button")).click()
    let isModalShown = true; 
    try {
      await driver.findElement(By.css('.popup-backdrop > .popup-dialog'))
    } catch (e) {
      if (e.name == "NoSuchElementError") {
        isModalShown = false;
      }
    }
    assert.equal(isModalShown, false)
  })

  it('OpenClickBackdrop', async function() {
    await driver.manage().setTimeouts({ implicit: 5000 });
    await goToLSG(driver, Component_URL);

    await driver.findElement(By.xpath("//*[contains(text(), 'Open Popup - Text')]")).click()
    await driver.findElement(By.css('.popup-backdrop > .popup-dialog'))
    await driver.findElement(By.css(".popup-backdrop")).click()
    let isModalShown = true; 
    try {
      await driver.findElement(By.css('.popup-backdrop > .popup-dialog'))
    } catch (e) {
      if (e.name == "NoSuchElementError") {
        isModalShown = false;
      }
    }
    assert.equal(isModalShown, true)
  })
})


