import { test as setup } from '../fixtures/test'
import { waitForUrlContains } from '../utils/waiters';
import { test_ids } from '../data/test-ids';
import { expectHasText } from '../utils/asserts';
import dotenv from 'dotenv';
dotenv.config();

const state = {
    random_username: `user_${Date.now()}`,
    password: 'Test@123'
  };


setup('Register user and login with same user', async ({ page, loginPage, RegisterPage }) => {
    await RegisterPage.goto();
    await RegisterPage.fill_user_details({
      [test_ids.register.firstname]: 'Test',
      [test_ids.register.lastname]: 'User',
      [test_ids.register.address]: 'India',
      [test_ids.register.city]: 'Mumbai',
      [test_ids.register.state]: 'Mumbai',
      [test_ids.register.zipcode]: '12345',
      [test_ids.register.phone]: '345678',
      [test_ids.register.SSN]: '456793',
      [test_ids.register.username]: state.random_username,
      [test_ids.register.password]: state.password,
      [test_ids.register.confirmPassword]: state.password,
    });
    await RegisterPage.click_Register();
    await expectHasText(
      page.locator(test_ids.register.WelcomeMsg),
      `Welcome ${state.random_username}`
    );
    console.log('New user is created: ' + state.random_username);
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