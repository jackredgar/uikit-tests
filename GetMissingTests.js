import { Builder } from 'selenium-webdriver'
import { goToLSG } from './utilities.js'
import 'dotenv/config'

let driver = await new Builder().forBrowser('chrome').build()
await driver.manage().setTimeouts({ script: 60000 });


let vars = {}

let env = process.env.ENVIRONMENT
let patternsURL = env == "QA" ? "https://axosbank-qa-sentry.outsystemsenterprise.com/AXOS_Reactive_LSG/Patterns" : "https://axosbank-dev-sentry.outsystemsenterprise.com/AXOS_Reactive_LSG/Patterns"

let savedCookies = null;

savedCookies = await goToLSG(driver, patternsURL, savedCookies);



await driver.quit();

