import { test_ids } from '../data/test-ids';
import { test, expect } from '../fixtures/test';
import { waitForUrlContains } from '../utils/waiters';
import { expectHasText } from '../utils/asserts';
import { request } from 'http';

test.describe('User Journey', () => {
  test('User Register and Do Account Services', async ({
    page,
    loginPage,
    RegisterPage,
    AccountPage,
    BillPayPage,
    TransferPage,
    api
  }) => {
    const random_username: string = `user_${Date.now()}`;
    let Account_number: string = '';
    let amount_to_pay: string = '10.00';
    await test.step('Register User and Login with Same user', async () => {
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
    });

    await test.step('Create new account', async () => {
        await AccountPage.goto();
        await AccountPage.clickNewAccount();
        await waitForUrlContains(page, 'openaccount.htm');
        await AccountPage.selectAccountType('SAVINGS');
        await AccountPage.SelectFromAccount();
        await page.waitForTimeout(1000);
        await AccountPage.click_New_Account_Button();
        await page.waitForTimeout(1000);

        await AccountPage.verifyAccountCreation();
        await waitForUrlContains(page, 'openaccount.htm');
        Account_number = await AccountPage.getAccountId();
        console.log('Newly created account id is: ' + Account_number);
        expect(Account_number).not.toBeNull();
    });

    await test.step('Account Overview', async () => {
        await AccountPage.clickAccountOverview();
        const accountOverviewLink = await AccountPage.getAccountOverviewLinkById(Account_number);
        console.log('Account Overview link for account id ' + accountOverviewLink);
        expect(accountOverviewLink).not.toBeNull();
    });

    await test.step('Transfer Funds', async () => {
        await TransferPage.click(test_ids.transfer_funds.transfer_funds);
        await page.waitForTimeout(1000);
        await waitForUrlContains(page, 'transfer.htm');
        //const fromAccount ='14787'
        const fromAccount = await TransferPage.getFromAccountNumber();
        console.log('From account number is: ' + fromAccount);
        await TransferPage.fill_amount('10.00');
        await TransferPage.selectToAccount(Account_number);
        await TransferPage.click_Transfer();
        await page.waitForTimeout(1000);
        await waitForUrlContains(page, 'transfer.htm');
        await TransferPage.verifyTransferSuccess();
        await TransferPage.verifyTransferdetails('10.00', fromAccount, Account_number);
    });

    await test.step('Bill Pay', async () => {
        await BillPayPage.click(test_ids.bill_pay.bill_pay);
        await page.waitForTimeout(1000);
        await waitForUrlContains(page, 'billpay.htm');
        await BillPayPage.fill_payee_details({
          [test_ids.bill_pay.payee_name]: 'Test',
          [test_ids.bill_pay.payee_address]: 'India',
          [test_ids.bill_pay.payee_city]: 'Mumbai',
          [test_ids.bill_pay.payee_state]: 'Mumbai',
          [test_ids.bill_pay.payee_zipcode]: '12345',
          [test_ids.bill_pay.payee_phone]: '345678',
        });
        await BillPayPage.fill_payment_details({
          [test_ids.bill_pay.payee_account]: '123456',
          [test_ids.bill_pay.verify_account]: '123456',
          [test_ids.bill_pay.amount]: amount_to_pay,
        });
        await BillPayPage.selectFromAccount(Account_number);
        await BillPayPage.click_Send_Payment();
        await page.waitForTimeout(1000);
        await waitForUrlContains(page, 'billpay.htm');
        await BillPayPage.verifyPaymentSuccess();
        await BillPayPage.verifyPaymentDetails(amount_to_pay, Account_number, 'Test');
    });

    //https://parabank.parasoft.com/parabank/services_proxy/bank/accounts/17007/transactions/amount/50
    test.step('Find transaction API call', async () => {
      const res = await api.get(`${Account_number}/transactions/amount/${amount_to_pay}`);
      expect(res.status()).toBe(200);
      expect(res.ok()).toBeTruthy();
      /*expect(res.status()).toBe(200);
      const responseBody = await res.json();
      console.log('API Response for account transactions: ' + JSON.stringify(responseBody));
      expect(responseBody.accountId).toBeDefined();
      expect(responseBody.transactions).toBeDefined();
      expect(Array.isArray(responseBody.transactions)).toBe(true);*/
      
      
    });


  });
});