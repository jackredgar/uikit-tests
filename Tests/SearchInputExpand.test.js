// Generated by Selenium IDE
const { Builder, By, Key, until, ExpectedConditions } = require('selenium-webdriver')
const assert = require('assert')

describe('Expandable Search Input', function() {
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
  it('OpenTypeClose', async function() {
    await driver.manage().setTimeouts({ implicit: 10000 });
    await goToLSG(driver, "https://axosbank-dev-sentry.outsystemsenterprise.com/AXOS_Reactive_LSG/PatternDetail?MenuCategoryId=8&MenuSubCategorId=122");

    await driver.findElement(By.css('i[aria-label="open search field"]')).click()
    await driver.findElement(By.css('input[placeholder="Search Here..."]')).sendKeys("hello")
    await driver.findElement(By.css('i[aria-label="close search field"]')).click()
    
  })

  it('OpenTypeClickOut', async function() {
    await driver.manage().setTimeouts({ implicit: 10000 });
    await goToLSG(driver, "https://axosbank-dev-sentry.outsystemsenterprise.com/AXOS_Reactive_LSG/PatternDetail?MenuCategoryId=8&MenuSubCategorId=122");

    await driver.findElement(By.css('i[aria-label="open search field"]')).click()
    await driver.findElement(By.css('input[placeholder="Search Here..."]'))
    await driver.findElement(By.css('div.pattern-preview-header > div.heading6')).click()
    await driver.findElement(By.css('i[aria-label="open search field"]'))
  })

  it('OpenClose', async function() {
    await driver.manage().setTimeouts({ implicit: 10000 });
    await goToLSG(driver, "https://axosbank-dev-sentry.outsystemsenterprise.com/AXOS_Reactive_LSG/PatternDetail?MenuCategoryId=8&MenuSubCategorId=122");

    await driver.findElement(By.css('i[aria-label="open search field"]')).click()
    await driver.findElement(By.css('input[placeholder="Search Here..."]'))
    await driver.findElement(By.css('i[aria-label="close search field"]')).click()
  })
})


