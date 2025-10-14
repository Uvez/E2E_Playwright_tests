import { test_ids } from '../data/test-ids';
import { test, expect } from '../fixtures/test';
import { waitForUrlContains } from '../utils/waiters';
import { expectHasText } from '../utils/asserts';
//import { AccountPage } from '../pages/components/AccountPage';

test.describe('User Journey', () => {
  test('Register user and login with same user', async ({
    page,
    loginPage,
    RegisterPage,
    AccountPage
  }) => {
    await test.step('Register User and Login with Same user', async () => {
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
        [test_ids.register.confirmPassword]: 'Test@123',
      });
      await RegisterPage.click_Register();
      const expected_string = 'Welcome ' + random_username;
      await expectHasText(page.locator(test_ids.register.WelcomeMsg), expected_string);
      console.log('New user is created: ' + random_username);
      await expectHasText(
        page.locator(test_ids.register.RegisterSuccessMsg),
        'Your account was created successfully. You are now logged in.'
      );

      await RegisterPage.click_logout();
      await waitForUrlContains(page, 'index.htm');
      await loginPage.goto();
      await loginPage.login(random_username, 'Test@123');
      await waitForUrlContains(page, 'overview.htm');
      await AccountPage.goto();
      await AccountPage.clickNewAccount();
      await waitForUrlContains(page, 'openaccount.htm');
      await AccountPage.selectAccountType('SAVINGS');
      //await AccountPage.selectAccountType('1');
      await AccountPage.SelectFromAccount();
      await page.waitForTimeout(100);
      await AccountPage.click_New_Account_Button();
      //await AccountPage.click(test_ids.account_services.OpenNewAccountBtn);
      //const btn = await page.locator('//input[value="Open New Account"]')
      //btn.click();
      await page.waitForTimeout(100);
      //await waitForUrlContains(page, 'openaccount.htm');
      //take screenshot of the opened account page
      await page.screenshot({ path: `screenshots/open_account_${random_username}.png`, fullPage: true });
      
      /*await AccountPage.verifyAccountCreation();
      await waitForUrlContains(page, 'openaccount.htm');
      const Account_number = await AccountPage.getAccountId();
      console.log('Newly created account id is: ' + Account_number);
      expect(Account_number).not.toBeNull();

      //await AccountPage.clickAccountOverview();
      //const accountOverviewLink = await AccountPage.getAccountOverviewLinkById(Account_number);
      //console.log('Account Overview link for account id ' + accountOverviewLink);
      //expect(accountOverviewLink).not.toBeNull();*/
    });
  });
});
