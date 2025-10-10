
import { RegisterPage } from '../pages/components/RegisterPage'
import { test_ids } from "../data/test-ids";
import { test, expect } from '../fixtures/test';
import { waitForUrlContains } from '../utils/waiters';
import { BasePage } from '../pages/BasePage';
import { expectHasText } from '../utils/asserts';

test.describe('User Journey', () => {
  test('Register user and login with same user', async ({ page, loginPage, RegisterPage }) => {
    await test.step('Register User', async () => {
      const random_username: string = `user_${Date.now()}`;
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
        [test_ids.register.username]: random_username,
        [test_ids.register.password]: 'Test@123',
        [test_ids.register.confirmPassword]: 'Test@123'
      });
      await RegisterPage.click_Register();
      const expected_string = 'Welcome ' + random_username;
      await expectHasText(page.locator(test_ids.register.registerSuccessMsg), expected_string);
    });

    //await waitForUrlContains(page, '/registersuccess');
  });
  //await loginPage.open();
  //await loginPage.login(creds.email, creds.pass);
  //await waitForUrlContains(page, '/home');
  //await homePage.expectLoaded();
  // });

  //await test.step('Logout', async () => {
  //await header.logout();
  //await toast.expectTextContains(/signed out/i);
  //});
});

