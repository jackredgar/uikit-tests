// Generated by Selenium IDE
import { Builder, By } from 'selenium-webdriver'
import { strict as assert } from 'assert';
import 'dotenv/config'
import { goToLSG } from '../utilities.js'

describe('Action Toolbar', function() {
  this.timeout(30000)
  let driver
  let vars
  
  let env = process.env.ENVIRONMENT
  let Component_URL = env == "QA" ? "https://axosbank-qa-sentry.outsystemsenterprise.com/AXOS_Reactive_LSG/PatternDetail?MenuCategoryId=8&MenuSubCategorId=119" : "https://axosbank-dev-sentry.outsystemsenterprise.com/AXOS_Reactive_LSG/PatternDetail?MenuCategoryId=8&MenuSubCategorId=119"

  let savedCookies = null;

  beforeEach(async function() {
    driver = await new Builder().forBrowser('chrome').build()
    vars = {}
  })
  afterEach(async function() {
    await driver.quit();
  })
  it('OpenClose', async function() {
    await driver.manage().setTimeouts({ implicit: 10000 });
    savedCookies = await goToLSG(driver, Component_URL, savedCookies);

    await driver.findElement(By.css('div.faketable-row input.checkbox')).click()
    await driver.findElement(By.css('div[data-block="CustomPatterns.ActionToolbar"]'))
    await driver.findElement(By.css('div.pattern-preview-header > div.heading6')).click()
    let isToolbarShown = await driver.findElement(By.css('div[data-block="CustomPatterns.ActionToolbar"]')).isDisplayed()
    assert.equal(isToolbarShown, false)
  })

  it('OpenCancel', async function() {
    await driver.manage().setTimeouts({ implicit: 10000 });
    savedCookies = await goToLSG(driver, Component_URL, savedCookies);
    
    await driver.findElement(By.css('div.pattern-preview-options input.switch')).click()
    await driver.findElement(By.css('div.faketable-row input.checkbox')).click()
    await driver.findElement(By.css('div[data-block="CustomPatterns.ActionToolbar"]'))
    await driver.findElement(By.css('div[data-block="CustomPatterns.ActionToolbar"] .cancel-control')).click()
    let isToolbarShown = await driver.findElement(By.css('div[data-block="CustomPatterns.ActionToolbar"]')).isDisplayed()
    assert.equal(isToolbarShown, false)
  })

  it('OpenMultipleSelections', async function() {
    await driver.manage().setTimeouts({ implicit: 10000 });
    savedCookies = await goToLSG(driver, Component_URL, savedCookies);

    let checkboxes = await driver.findElements(By.css('div.faketable-row input.checkbox'))
    // console.log(checkboxes)
    for (let i = 0; i < checkboxes.length && i <= 2; i++) {
      await checkboxes[i].click();
    }
    await driver.findElement(By.css('div[data-block="CustomPatterns.ActionToolbar"]'))
    let selectedText = await driver.findElement(By.css('div[data-block="CustomPatterns.ActionToolbar"] div.selection-counter > span')).getText()
    assert.equal(selectedText, '3 selected')
  })

  it('OpenMaxSelections', async function() {
    await driver.manage().setTimeouts({ implicit: 10000 });
    savedCookies = await goToLSG(driver, Component_URL, savedCookies);

    let checkboxes = await driver.findElements(By.css('div.faketable-row input.checkbox'))
    // console.log(checkboxes)
    for (let i = 0; i < checkboxes.length; i++) {
      await checkboxes[i].click();
    }
    await driver.findElement(By.css('div[data-block="CustomPatterns.ActionToolbar"]'))
    let selectedText = await driver.findElement(By.css('div[data-block="CustomPatterns.ActionToolbar"] div.selection-counter > span')).getText()
    assert.equal(selectedText, '999+ selected')
  })

  it('OpenClickAction', async function() {
    await driver.manage().setTimeouts({ implicit: 10000 });
    savedCookies = await goToLSG(driver, Component_URL, savedCookies);

    await driver.findElement(By.css('div.faketable-row input.checkbox')).click()
    await driver.findElement(By.css('div[data-block="CustomPatterns.ActionToolbar"]'))
    await driver.findElement(By.css('div[data-block="CustomPatterns.ActionToolbar"] .buttoncomponent-list .buttoncomponent-item')).click()
    await driver.findElement(By.css('div.feedback-message-wrapper > .feedback-message'))
  })

})


