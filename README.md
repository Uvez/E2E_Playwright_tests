# E2E_Playwright_tests

Simple step‑by‑step guide to set up and run the Playwright E2E tests for this project.

## Prerequisites (what you need)
Mac (macOS)
- OS: macOS 10.14 or newer.
- Install Node.js:
  - Using Homebrew (recommended):
    ```sh
    brew install node
    ```
  - Or use nvm to manage Node versions:
    ```sh
    curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.4/install.sh | bash
    source ~/.nvm/nvm.sh
    nvm install --lts
    nvm use --lts
    ```
  - Or download installer from https://nodejs.org and run it.
- Verify:
  ```sh
  node -v
  npm -v
  npx -v
  git --version
  ```
- Optional tools:
  - Homebrew: https://brew.sh
  - VS Code for editing.

Windows
- OS: Windows 10 or Windows 11.
- Install Node.js:
  - Download and run the LTS installer from https://nodejs.org and follow the installer.
  - Or use nvm for Windows: https://github.com/coreybutler/nvm-windows (install nvm, then `nvm install lts`).
- Verify:
  ```powershell
  node -v
  npm -v
  npx -v
  git --version
  ```
- Install Git for Windows: https://git-scm.com/download/win
- If you use PowerShell, run it as normal user (no admin needed for typical installs).
- Optional: Use WSL2 if you prefer a Linux environment on Windows.

## Quick setup (one time)

1. Open Github link and clone the github repistory into your local system by using terminal

    ``cd https://github.com/Uvez/E2E_Playwright_tests.git``

2. Install node modules:
   `npm install`

3. Install Playwright browsers:
ß
   `npx playwright install`

4. Create or edit `.env` to set BASE_URL:

   `BASE_URL='https://parabank.parasoft.com/'`

## How to run tests

- Run test (By default it will be executed in chrome browser)
  `npm run test`

- Running test in all browser

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


## Project layout and what each folder/file does (simple)

- playwright.config.ts  
  Playwright configuration (time outs, reporters, baseURL, projects).

- fixtures/test.ts  
  Custom Playwright fixtures. This file creates and exposes page objects (loginPage, RegisterPage, AccountPage, etc.) and other shared fixtures to tests.

- tests/  
  Test spec files. Example: `tests/user-journey.spec.ts` — main end‑to‑end scenario.

- pages/  
  Page object models (POM). These wrap UI actions and selectors so tests stay readable. Common subfolders:
  - pages/auth — login related page(s)
    - `LoginPage`
  - pages/components — feature pages and small components
    - `RegisterPage`
    - `AccountPage`
    - `BillPayPage`
    - `TransferPage`
    - `HeaderPage`


- data/  
  Centralized locators and test IDs:
  - `data/test-ids.ts`

- utils/  
  Helper utilities used by pages/tests:
  - `utils/waiters.ts` — helper to wait for URLs or conditions
  - `utils/asserts.ts` — custom assertion helpers
  - `utils/logger.ts` — simple logger

- .env  
  Environment overrides (BASE_URL etc.)

- package.json  
  Scripts and dependencies (run tests, lint, etc.)

## How the test files use the project

- Tests import your custom `test` from `fixtures/test.ts`. That custom test already provides page objects (RegisterPage, AccountPage, etc.) to the test callbacks.
- Use async test callbacks and await page actions.
- Keep selectors in `data/test-ids.ts` so locators are easy to update.


