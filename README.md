# E2E_Playwright_tests
**README Documentation**

This README provides setup and usage instructions for the E2E Playwright test framework. It outlines prerequisites, installation steps, environment configuration, test execution commands, and describes the project structure. The documentation is intended to help users quickly install dependencies, configure the environment, run tests, and understand the organization of the framework components.

End to End Framework with Playwright - UI and API,DB  
This is a modular test framework developed in Playwright

## Quick Start

Prerequisites
- Node.js >= 16 and npm installed (Mac: use Homebrew or Node installer).
- npx (included with npm).

Install and prepare
```sh
# 1. Install project dependencies
npm install

# 2. Install Playwright browsers
npx playwright install
```

Optional: configure environment
- Edit `.env` at the repo root to set BASE_URL or other env vars used by tests.

Run tests
```sh
# Run all tests (uses playwright.config.ts)
npm run test

# Run a single test file
npx playwright test tests/user-registration.spec.ts

# Run a single test by title
npx playwright test -g "User Register and Do Account Services"

# Open the HTML report after a run
npx playwright show-report
```

Project structure
- playwright.config.ts — Playwright configuration (projects, reporters, baseURL).
- fixtures/test.ts — custom fixtures that inject page objects into tests.
- tests/*.spec.ts — test files (e.g., tests/user-registration.spec.ts).
- pages/ — page object models (LoginPage, RegisterPage, AccountPage, BillPayPage, TransferPage, etc.).
- data/test-ids.ts — centralized selectors/locators used across pages.
- utils/ — helper utilities (waiters, asserts, selects).
- .env — environment overrides (BASE_URL).

