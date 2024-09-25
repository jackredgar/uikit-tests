## Installation
* Use `npm install` to get all required packages
* Must have chromedriver.exe in your local repository (Version must match your local Chrome version)

## Run

* Use `npm run test` to run all tests
* Use `npx mocha "Tests/testname.js"` to run an individual test
* Use `node GetMissingTests.js` to check for missing component tests

## Environment Variables
* Use the `.env` file to change which environment the tests run on (DEV or QA)
* Must setup the DEV and QA URL for the component in each test file
