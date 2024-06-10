// Generated by Selenium IDE
const { Builder, By, Key, until, ExpectedConditions } = require('selenium-webdriver')
const assert = require('assert')
const { NoSuchElementError } = require('selenium-webdriver/lib/error')

describe('Pagination', function() {
  this.timeout(30000)
  let driver
  let vars

  let savedCookies = null;

  async function goToLSG(driver, componentURL) {
    await driver.get("https://axosbank-dev-sentry.outsystemsenterprise.com/AXOS_Reactive_LSG/")
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

  it('ClickPage', async function() {
    await driver.manage().setTimeouts({ implicit: 2000 });
    await goToLSG(driver, "https://axosbank-dev-sentry.outsystemsenterprise.com/AXOS_Reactive_LSG/PatternDetail?MenuCategoryId=8&MenuSubCategorId=117");

    await driver.findElement(By.xpath("//*[contains(text(), '4') and contains(@class, 'page-number')]")).click()
    await driver.findElement(By.xpath("//*[contains(text(), 'Current Page: 4')]"))
  })

  it('ClickMiddlePage', async function() {
    await driver.manage().setTimeouts({ implicit: 2000 });
    await goToLSG(driver, "https://axosbank-dev-sentry.outsystemsenterprise.com/AXOS_Reactive_LSG/PatternDetail?MenuCategoryId=8&MenuSubCategorId=117");

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
    await goToLSG(driver, "https://axosbank-dev-sentry.outsystemsenterprise.com/AXOS_Reactive_LSG/PatternDetail?MenuCategoryId=8&MenuSubCategorId=117");

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
    await goToLSG(driver, "https://axosbank-dev-sentry.outsystemsenterprise.com/AXOS_Reactive_LSG/PatternDetail?MenuCategoryId=8&MenuSubCategorId=117");

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

