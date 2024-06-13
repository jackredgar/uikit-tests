// Generated by Selenium IDE
import { Builder, By } from 'selenium-webdriver'
import { strict as assert } from 'assert';
import 'dotenv/config'
import { goToLSG } from '../utilities.js'

describe('Notification Badge', function() {
  this.timeout(30000)
  let driver
  let vars

  let env = process.env.ENVIRONMENT
  let Component_URL = env == "QA" ? "https://axosbank-qa-sentry.outsystemsenterprise.com/AXOS_Reactive_LSG/PatternDetail?MenuCategoryId=8&MenuSubCategorId=79" : "https://axosbank-dev-sentry.outsystemsenterprise.com/AXOS_Reactive_LSG/PatternDetail?MenuCategoryId=8&MenuSubCategorId=79"

  let savedCookies = null;

  beforeEach(async function() {
    driver = await new Builder().forBrowser('chrome').build()
    vars = {}
  })
  afterEach(async function() {
    await driver.quit();
  })

  it('ClickBadge', async function() {
    await driver.manage().setTimeouts({ implicit: 2000 });
    savedCookies = await goToLSG(driver, Component_URL, savedCookies);

    await driver.findElement(By.css('div[data-block="CustomPatterns.NotificationBadge"] > div > div')).click()
    const badgeStyle = await driver.findElement(By.css('div[data-block="CustomPatterns.NotificationBadge"] > div > div')).getCssValue("outline");

    assert(badgeStyle.includes("rgb(222, 244, 255"))
  })

  it('HoverBadge', async function() {
    await driver.manage().setTimeouts({ implicit: 2000 });
    savedCookies = await goToLSG(driver, Component_URL, savedCookies);

    const badgeEl = await driver.findElement(By.css('div[data-block="CustomPatterns.NotificationBadge"] > div > div'))
    const actions = driver.actions({async: true});
    await actions.move({origin: badgeEl}).perform();
    const badgeStyle = await driver.findElement(By.css('div[data-block="CustomPatterns.NotificationBadge"] > div > div')).getCssValue("outline");

    assert(badgeStyle.includes("rgb(244, 244, 244"))
  })

  it('CheckWideBadge', async function() {
    await driver.manage().setTimeouts({ implicit: 2000 });
    savedCookies = await goToLSG(driver, Component_URL, savedCookies);

    await driver.findElement(By.xpath('//span[contains(text(), "Badge Text Value")]//parent::label//parent::div/span/input')).sendKeys("12")
    await driver.findElement(By.css('div[data-block="CustomPatterns.NotificationBadge"] > div > div'))
    const badgeStyle = await driver.findElement(By.css('div[data-block="CustomPatterns.NotificationBadge"] > div > div')).getCssValue("width");

    assert.equal(badgeStyle, "18px")
  })
})


