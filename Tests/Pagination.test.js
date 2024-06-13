// Generated by Selenium IDE
import { Builder, By } from 'selenium-webdriver'
import { strict as assert } from 'assert';
import 'dotenv/config'
import { goToLSG } from '../utilities.js'

describe('Pagination', function() {
  this.timeout(30000)
  let driver
  let vars

  let env = process.env.ENVIRONMENT
  let Component_URL = env == "QA" ? "https://axosbank-qa-sentry.outsystemsenterprise.com/AXOS_Reactive_LSG/PatternDetail?MenuCategoryId=8&MenuSubCategorId=117" : "https://axosbank-dev-sentry.outsystemsenterprise.com/AXOS_Reactive_LSG/PatternDetail?MenuCategoryId=8&MenuSubCategorId=117"

  let savedCookies = null;

  beforeEach(async function() {
    driver = await new Builder().forBrowser('chrome').build()
    vars = {}
  })
  afterEach(async function() {
    await driver.quit();
  })

  it('ClickPage', async function() {
    await driver.manage().setTimeouts({ implicit: 2000 });
    savedCookies = await goToLSG(driver, Component_URL, savedCookies);

    await driver.findElement(By.xpath("//*[contains(text(), '4') and contains(@class, 'page-number')]")).click()
    await driver.findElement(By.xpath("//*[contains(text(), 'Current Page: 4')]"))
  })

  it('ClickMiddlePage', async function() {
    await driver.manage().setTimeouts({ implicit: 2000 });
    savedCookies = await goToLSG(driver, Component_URL, savedCookies);

    await driver.findElement(By.xpath("//*[contains(text(), '8') and contains(@class, 'page-number')]")).click()
    const paginationChildren = await driver.findElements(By.css(".pagination-list > a"))
    let truncationCount = 0;
    for (let i = 0; i < paginationChildren.length; i++) {
      if (await paginationChildren[i].getText() == "...") {
        truncationCount += 1
      }
    }
    //Check number of truncated pages
    assert.equal(truncationCount, 2)
  })

  it('ClickLastPage', async function() {
    await driver.manage().setTimeouts({ implicit: 2000 });
    savedCookies = await goToLSG(driver, Component_URL, savedCookies);

    await driver.findElement(By.xpath("//*[contains(text(), '15') and contains(@class, 'page-number')]")).click()
    const paginationChildren = await driver.findElements(By.css(".pagination-list > a"))
    let truncationCount = 0;
    for (let i = 0; i < paginationChildren.length; i++) {
      if (await paginationChildren[i].getText() == "...") {
        truncationCount += 1
      }
    }
    //Check number of truncated pages
    assert.equal(truncationCount, 1)

    //Check correct page selected
    await driver.findElement(By.xpath("//*[contains(text(), 'Current Page: 15')]"))

    //Check chevron disabled
    let chevronRightEnabled = await driver.findElement(By.css("i.icon-axos-Navigation_chevron_right.pagination-chevron")).getCssValue("pointer-events")
    assert.equal(chevronRightEnabled, "none")
  })

  it('CheckFirstPage', async function() {
    await driver.manage().setTimeouts({ implicit: 2000 });
    savedCookies = await goToLSG(driver, Component_URL, savedCookies);

    const paginationChildren = await driver.findElements(By.css(".pagination-list > a"))
    let truncationCount = 0;
    for (let i = 0; i < paginationChildren.length; i++) {
      if (await paginationChildren[i].getText() == "...") {
        truncationCount += 1
      }
    }
    //Check number of truncated pages
    assert.equal(truncationCount, 1)

    //Check correct page selected
    await driver.findElement(By.xpath("//*[contains(text(), 'Current Page: 1')]"))

    //Check chevron disabled
    let chevronRightEnabled = await driver.findElement(By.css("i.icon-axos-Navigation_chevron_left.pagination-chevron")).getCssValue("pointer-events")
    assert.equal(chevronRightEnabled, "none")
  })
})


