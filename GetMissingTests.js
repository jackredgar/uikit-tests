import { Builder, By } from 'selenium-webdriver'
import {Options} from "selenium-webdriver/chrome.js";
import { goToLSG } from './utilities.js'
import 'dotenv/config'
import * as fs from 'fs'

async function getMissingTests() {
    let options = new Options()
    let driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options.addArguments('--headless=new'))
        .build();
    await driver.manage().setTimeouts({ script: 60000, implicit: 15000 });

    let env = process.env.ENVIRONMENT;
    let patternsURL = env == "QA" ? "https://axosbank-qa-sentry.outsystemsenterprise.com/AXOS_Reactive_LSG/Patterns" : "https://axosbank-dev-sentry.outsystemsenterprise.com/AXOS_Reactive_LSG/Patterns"

    let files = fs.readdirSync('./Tests')

    files = files.map((fileName) => {
        return fileName.split(".")[0]
    })

    // console.log(files)

    let savedCookies = null;

    savedCookies = await goToLSG(driver, patternsURL, savedCookies);

    try {

        await getMissingByAccordion(driver, files, "Custom Patterns")

        await getMissingByAccordion(driver, files, "Widgets")
 
    } catch(e) {
        console.error("Error finding patterns: ", e);
    }
    await driver.quit();
    
}

async function getMissingByAccordion(driver, files, accordionLabel,) {
    // const patterns = await driver.findElements(By.css("div.osui-accordion div[data-block='LSG_Patterns.Patterns_NavigationBarItems'] a"));
    const patterns = await driver.findElements(By.xpath(`//span[contains(text(), '${accordionLabel}')]/../../../..//a`));
    // patterns.getId().then((patterns) => {
    //     console.log(patterns)
    // })
    // console.log(patterns);
    let hrefs = []
    for (let i = 0; i < patterns.length; i++) {
        // console.log(i)
        const hrefPromise = await patterns[i].getAttribute("href");
    
        // console.log("href", hrefPromise);

        hrefs.push(hrefPromise)
    }
    
    await driver.manage().setTimeouts({ script: 60000, implicit: 1000 });
    const map = {}
    for (let i = 0; i < hrefs.length; i++) {
        await driver.get(hrefs[i])
        try {
            const component = await driver.findElement(By.css("div[data-block*='CustomPatterns.']"))
            const datablockPromise = await component.getAttribute("data-block");
            const key = datablockPromise.split(".")[1]
            // console.log("data-block", datablockPromise)
            map[key] = files.includes(key)
        } catch {
            continue;
        }
    }
    
    const missingComponents = Object.keys(map).filter(k => !map[k])
    console.log(`Components Section: ${accordionLabel}`)
    console.log(map)
    console.log(`Total Amount: ${Object.keys(map).length}`)
    console.log(`Missing: ${Object.keys(missingComponents).length}`)
    console.log(`-------------------------------`)

    return map
}

getMissingTests();

