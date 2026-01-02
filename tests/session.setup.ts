import { test as setup } from '../fixtures/test'
import { waitForUrlContains } from '../utils/waiters';
import { test_ids } from '../data/test-ids';
import { expectHasText } from '../utils/asserts';
import { log } from '../utils/logger';
import {faker as test_data} from '@faker-js/faker'
//import { testdata } from '../data/register.json'
import dotenv from 'dotenv';
dotenv.config();

const state = {
    random_username: `user_${Date.now()}`,
    password:
      process.env.PASSWORD ??
      (() => {
        throw new Error('PASSWORD environment variable is not set');
      })()
  };

  //Setting up user before running tests
setup('Register user and login with same user', async ({ page, loginPage, RegisterPage }) => {
    setup.info().retry = 0;
    await RegisterPage.goto();
    await RegisterPage.fill_user_details({
      [test_ids.register.firstname]: test_data.person.firstName(),
      [test_ids.register.lastname]: test_data.person.lastName(),
      [test_ids.register.address]: test_data.location.streetAddress(),
      [test_ids.register.city]: test_data.location.city(),
      [test_ids.register.state]: test_data.location.state(),
      [test_ids.register.zipcode]: test_data.location.zipCode(),
      [test_ids.register.phone]: test_data.phone.number(),
      [test_ids.register.SSN]: test_data.string.numeric(),
      [test_ids.register.username]: state.random_username,
      [test_ids.register.password]: state.password,
      [test_ids.register.confirmPassword]: state.password,
    });
    await RegisterPage.click_Register();
    await expectHasText(
      page.locator(test_ids.register.WelcomeMsg),
      `Welcome ${state.random_username}`
    );
    log.info('New user is created: ' + state.random_username)
    await expectHasText(
      page.locator(test_ids.register.RegisterSuccessMsg),
      'Your account was created successfully. You are now logged in.'
    );

    await RegisterPage.click_logout();
    await waitForUrlContains(page, 'index.htm');
    await loginPage.goto();
    await loginPage.login(state.random_username, state.password);
    await waitForUrlContains(page, 'overview.htm');
    await page.context().storageState({path: ".auth/user.json"})
  });