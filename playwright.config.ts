import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './tests/',
  //timeout: 20_000,
  //expect: { timeout: 5_000 },
  fullyParallel: true,
  //forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: [['list'], ['html', { outputFolder: 'reports/html' }]],
  use: {
    baseURL: process.env.BASE_URL || 'https://parabank.parasoft.com/',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    //video: 'retain-on-failure'
  },
  projects: [

      {name :'setup', testMatch:  /.*\.setup\.ts/},

    { name: 'chromium', 
      dependencies:['setup'],
      use: { ...devices['Desktop Chrome'],
        storageState :'.auth/user.json'
      }
     },
    { name: 'firefox',  use: { ...devices['Desktop Firefox'], storageState :'.auth/user.json' } },
    { name: 'webkit',   use: { ...devices['Desktop Safari'], storageState :'.auth/user.json'} },
    // Mobile example
    //{ name: 'mobile-chrome', use: { ...devices['Pixel 7'] } }
  ],
  //grepInvert: process.env.SKIP_FLAKY ? /@flaky/ : undefined
});
