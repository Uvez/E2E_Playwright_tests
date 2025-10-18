import { test_ids } from '../data/test-ids';
import { test, expect } from '../fixtures/test';
import { waitForUrlContains } from '../utils/waiters';
import { expectHasText } from '../utils/asserts';
import { request } from '@playwright/test';
import dotenv from 'dotenv';
import { RegisterPage } from '../pages/components/RegisterPage';
dotenv.config();

test.describe.serial('User Journey', () => {
  const state = {
    random_username: `user_${Date.now()}`,
    password: process.env.PASSWORD,
    amount_to_pay: '10.00',
  };
  let Account_number: string;
  let fromAccount: string;

  test('Register user and login with same user and verify the same user', async ({
    page,
    AccountPage,
  }) => {
    await AccountPage.goto();
    await waitForUrlContains(page, 'overview.htm');
  });

  test('Create a new Savings account', async ({ page, AccountPage }) => {
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
    expect(Account_number, 'New account id should be captured').toBeTruthy();
    console.log('Account Number created' + Account_number);
  });

  test('Account Overview lists the new account', async ({ AccountPage }) => {
    await AccountPage.goto();
    await AccountPage.clickAccountOverview();
    const accountOverviewLink = await AccountPage.getAccountOverviewLinkById(Account_number);
    console.log('Account Overview link for account id ' + accountOverviewLink);
    expect(accountOverviewLink, 'Overview link should exist for the created account').toBeTruthy();
  });

  test('Transfer Funds into Account', async ({ page, TransferPage }) => {
    await TransferPage.goto();
    await TransferPage.click(test_ids.transfer_funds.transfer_funds);
    await page.waitForTimeout(1000);
    await waitForUrlContains(page, 'transfer.htm');
    fromAccount = await TransferPage.getFromAccountNumber();
    console.log('From account number is: ' + fromAccount);
    await TransferPage.fill_amount('10.00');
    await TransferPage.selectToAccount(Account_number);
    await TransferPage.click_Transfer();
    await page.waitForTimeout(1000);
    await waitForUrlContains(page, 'transfer.htm');
    await TransferPage.verifyTransferSuccess();
    await TransferPage.verifyTransferdetails('10.00', fromAccount, Account_number);
  });

  test('Bill Pay succeeds and transactions are visible via API', async ({ page, BillPayPage }) => {
    await BillPayPage.goto();
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
      [test_ids.bill_pay.amount]: state.amount_to_pay,
    });
    await BillPayPage.selectFromAccount(Account_number);
    await BillPayPage.click_Send_Payment();
    await page.waitForTimeout(1000);
    await waitForUrlContains(page, 'billpay.htm');
    await BillPayPage.verifyPaymentSuccess();
    await BillPayPage.verifyPaymentDetails(state.amount_to_pay, Account_number, 'Test');

    const res = await page.request.get(
      `${process.env.API_GET_URL}${Account_number}/transactions/amount/${state.amount_to_pay}`
    );
    console.log('API Response status for account transactions: ' + res.status());
    expect(res.status()).toBe(200);
    expect(res.ok()).toBeTruthy();
    const responseBody = await res.json();
    console.log('API Response for account transactions: ' + JSON.stringify(responseBody));

    expect(Array.isArray(responseBody)).toBeTruthy();

    expect(responseBody[1].accountId).toBe(parseInt(Account_number));
    expect(responseBody[1].amount).toBe(parseInt(state.amount_to_pay));

    expect(responseBody).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          type: expect.stringMatching(/Credit|Debit/),
          description: expect.any(String),
        }),
      ])
    );
  });
});
