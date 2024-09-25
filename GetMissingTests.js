import { Builder, By } from 'selenium-webdriver'
import { goToLSG } from './utilities.js'
import 'dotenv/config'

async function getMissingTests() {
    let driver = await new Builder().forBrowser('chrome').build();
    await driver.manage().setTimeouts({ script: 60000, implicit: 15000 });

    let env = process.env.ENVIRONMENT;
    let patternsURL = env == "QA" ? "https://axosbank-qa-sentry.outsystemsenterprise.com/AXOS_Reactive_LSG/Patterns" : "https://axosbank-dev-sentry.outsystemsenterprise.com/AXOS_Reactive_LSG/Patterns"

    let savedCookies = null;

    savedCookies = await goToLSG(driver, patternsURL, savedCookies);

    try {
        const patterns = await driver.findElements(By.css("div[data-block*='CustomPatterns.'] a > span"));
        // patterns.getId().then((patterns) => {
        //     console.log(patterns)
        // })
        console.log(patterns);
        for (let i = 0; i < patterns.length; i++) {
            // console.log(i)
            const textPromise = await patterns[i].getAttribute("innerHTML");
        
            console.log("text", textPromise);
        }
        

        
    } catch(e) {
        console.error("Error finding patterns: ", e);
    }
    // await driver.quit();
    
}

getMissingTests();

