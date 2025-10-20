# E2E_Playwright_tests

Simple step‑by‑step guide to set up and run the Playwright E2E tests for this project.

## Prerequisites (what you need)
Mac (macOS) and Window OS
- OS: macOS 10.14 or newer.
- Install Node.js:
  - Using Homebrew (recommended):
   
    `brew install node`

  - Or download installer from `https://nodejs.org` and run it.
  - Verify whether node is installed in MacOS system :
  `node -v`
  `npm -v`
  `npx -v`
  `git --version`



Windows
- OS: Windows 10 or Windows 11.
- Install Node.js:
  - Download and run the LTS installer from `https://nodejs.org` and follow the installer.
  - Install Git for Windows: `https://git-scm.com/download/win`

- Verify whether node and git installed in Windows system :
  `node -v`
  `npm -v`
  `npx -v`
  `git --version`
 
- I have used `npm version = 11.4.2` and `node version = v22.16`

## Quick setup 

1. Open Github link and clone the github repistory into your local system by using terminal

    `cd https://github.com/Uvez/E2E_Playwright_tests.git`

2. Install below node modules:
   `npm install typescript`
   `npm install ts-node`
   `npm install prettier`
   `npm install eslint`
   `npm install dotenv`
   `npm install @types/node`
   `npm install @playwright/test`
   `npm install @faker-js/faker`

3. Install Playwright browsers:

   `npx playwright install`

4. Create or edit `.env` to set BASE_URL:

   `BASE_URL='https://parabank.parasoft.com/'`

## How to run tests

- Run test (By default it will be executed in chrome browser)
  `npm run test`

- Running test in all browser(Firefox, Safari, Chrome)

  `npm run test:all`

- Run a single test file:

  `npx playwright test tests/user-journey.spec.ts`
 

- Run a single test by name (grep):

  `npx playwright test -g "User Register and Do Account Services"`


- Run tests headed (show the browser UI):

 `npm run test:headed`


- Run a test in debug mode:
 
  `PWDEBUG=1 npx playwright test tests/user-journeyspec.ts`


- Show the HTML report after a run:
  
  `npx playwright show-report`


## Project layout and what each folder/file does: 

- `playwright.config.ts`  
  Playwright configuration (time outs, reporters, baseURL, projects).

- `fixtures/test.ts`  
  Custom Playwright fixtures. This file creates and exposes page objects (loginPage, RegisterPage, AccountPage, etc.) and other shared fixtures to tests.

- `tests/`  
  Test spec files. Example: `tests/user-journey.spec.ts` — main end‑to‑end scenario.

- `pages/`  
  Page object models (POM). These wrap UI actions and selectors so tests stay readable. Common subfolders:
  - `pages/api` - api verification function
  - `pages/auth` — login related page(s)
    - `LoginPage`
  - pages/components — feature pages and small components
    - `RegisterPage`
    - `AccountPage`
    - `BillPayPage`
    - `TransferPage`
    - `HeaderPage`


- `data/`  
  Centralized locators and test IDs:
  - `data/test-ids.ts`

- `utils/`  
  Helper utilities used by pages/tests:
  - `utils/waiters.ts` — helper to wait for URLs or conditions
  - `utils/asserts.ts` — custom assertion helpers
  - `utils/logger.ts` — simple logger

- `.env`  
  Environment overrides (BASE_URL, API URL.)

- `package.json`  
  Scripts and dependencies (run tests, packaged installed)

## How the test files use the project

- Tests import your custom `test` from `fixtures/test.ts`. That custom test already provides page objects (RegisterPage, AccountPage, etc.) to the test callbacks.
- Use async test callbacks and await page actions.
- Keep selectors in `data/test-ids.ts` so locators are easy to update.
- Utlized faer library for Test data generation every run.


