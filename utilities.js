import { By } from 'selenium-webdriver'

export async function goToLSG(driver, componentURL, savedCookies) {
    const env = process.env.ENVIRONMENT
    const LSG_URL = env == "QA" ? "https://axosbank-qa-sentry.outsystemsenterprise.com/AXOS_Reactive_LSG/" : "https://axosbank-dev-sentry.outsystemsenterprise.com/AXOS_Reactive_LSG/"
    let newCookies = null

    await driver.get(LSG_URL)
    driver.manage().window().maximize();
    if (savedCookies != null) {
      for (let i = 0; i < savedCookies.length; i++) {
        // console.log("individual cookie", savedCookies[i])
        await driver.manage().addCookie(savedCookies[i]);
      }
      await driver.navigate().to(componentURL);
      return savedCookies
    } else {
      await driver.findElement(By.css("#Input_UsernameVal")).click()
      await driver.findElement(By.css("#Input_UsernameVal")).sendKeys("LSG_Dev")
      await driver.findElement(By.css("#Input_PasswordVal")).click()
      await driver.findElement(By.css("#Input_PasswordVal")).sendKeys("pwd123")
      await driver.findElement(By.xpath("//*[@id='b6-Button']/button")).click()
      await driver.findElement(By.xpath("//*[@id='b2-Content']/h1/div[2]/span"))
      await driver.manage().getCookies().then(function(cookies) {
        // console.log('cookie details => ', cookies);
        newCookies = cookies;
      });
      await driver.navigate().to(componentURL);
      return newCookies;
    }
  }