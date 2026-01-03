import { test_ids } from '../data/test-ids';
import { test, expect } from '../fixtures/test';
import { waitForUrlContains } from '../utils/waiters';
import { expectHasText } from '../utils/asserts';
import { log } from '../utils/logger';
import { request } from '@playwright/test';
import dotenv from 'dotenv';
import { RegisterPage } from '../pages/components/RegisterPage';
import {faker as test_data} from '@faker-js/faker'
dotenv.config();


test.describe.serial('User Journey', () => {
  const state = {
    amount_to_pay: test_data.finance.amount(),
    transfer_amount: test_data.finance.amount(),
    payee_firstname : test_data.person.firstName(),
    payee_account_number : test_data.finance.accountNumber()
  };
  let accountNumber: string;
  let fromAccount: string = '';

  test('Verify all Global navigation is working as expected', async ({ page, HeaderPage}) => {
    await HeaderPage.goto();
    await HeaderPage.click_verify_link(test_ids.header.AboutUs, 'about.htm');
    await HeaderPage.click_verify_link(test_ids.header.Services, 'services.htm');
    await HeaderPage.click_verify_link(test_ids.header.AdminPage, 'admin.htm');
    await HeaderPage.click_verify_link(
      test_ids.header.Products,
      'https://www.parasoft.com/products/'
    );
    await HeaderPage.go_back();
   await HeaderPage.click_verify_link(
      test_ids.header.Locations,
      'https://www.parasoft.com/solutions/'
    );
     await HeaderPage.go_back();
  });

  test('Create a new Savings account', async ({ page, AccountPage }) => {
    await AccountPage.goto();
    await AccountPage.clickNewAccount();
    await waitForUrlContains(page, 'openaccount.htm');
    await AccountPage.selectAccountType('SAVINGS');
    await AccountPage.selectFromAccount();
    await page.waitForSelector(test_ids.account_services.new_account, { state: 'visible' });
    await AccountPage.click_New_Account_Button();
    //wait page.waitForTimeout(1000);

    await AccountPage.verifyAccountCreation();
    //await waitForUrlContains(page, 'openaccount.htm');
    accountNumber = await AccountPage.getAccountId();
    expect(accountNumber, 'New account id should be captured').toBeTruthy();
    log.info('Account Number created:'+accountNumber)
  });

  test('Account Overview lists the new account', async ({ AccountPage}) => {
    await AccountPage.goto();
    await AccountPage.clickAccountOverview();
    const accountOverviewLink = await AccountPage.getAccountOverviewLinkById(accountNumber);
    log.info('Account Overview link for account id ' + accountOverviewLink);
    expect(accountOverviewLink, 'Overview link should exist for the created account').toBeTruthy();
  });

  test('Transfer Funds into Account', async ({ page, TransferPage }) => {
    await TransferPage.goto();
    await TransferPage.click(test_ids.transfer_funds.transfer_funds);
    await waitForUrlContains(page, 'transfer.htm');
    fromAccount = await TransferPage.getFromAccountNumber();
    log.info('From account number is: ' + fromAccount);
    await TransferPage.fill_amount(state.transfer_amount);
    await TransferPage.selectToAccount(accountNumber);
    await TransferPage.click_Transfer();
    await waitForUrlContains(page, 'transfer.htm');
    await TransferPage.verifyTransferSuccess();
    await TransferPage.verifyTransferdetails(state.transfer_amount, fromAccount, accountNumber);
  });

  test('Bill Pay succeeds and transactions are visible via API', async ({ page, BillPayPage,Find_Transaction }) => {
    await BillPayPage.goto();
    await BillPayPage.click(test_ids.bill_pay.bill_pay);
    await waitForUrlContains(page, 'billpay.htm');
    await BillPayPage.fill_payee_details({
      [test_ids.bill_pay.payee_name]: state.payee_firstname,
      [test_ids.bill_pay.payee_address]: test_data.location.streetAddress(),
      [test_ids.bill_pay.payee_city]: test_data.location.city(),
      [test_ids.bill_pay.payee_state]: test_data.location.state(),
      [test_ids.bill_pay.payee_zipcode]: test_data.location.zipCode(),
      [test_ids.bill_pay.payee_phone]: test_data.phone.number(),
    });
    await BillPayPage.fill_payment_details({
      [test_ids.bill_pay.payee_account]: state.payee_account_number,
      [test_ids.bill_pay.verify_account]: state.payee_account_number,
      [test_ids.bill_pay.amount]:state.amount_to_pay,
    });
    await BillPayPage.selectFromAccount(accountNumber);
    await BillPayPage.click_Send_Payment();
    await waitForUrlContains(page, 'billpay.htm');
    await BillPayPage.verifyPaymentSuccess();
    await BillPayPage.verifyPaymentDetails(state.amount_to_pay, accountNumber, state.payee_firstname,);

    const res = await page.request.get(
      `${process.env.API_GET_URL}${accountNumber}/transactions/amount/${state.amount_to_pay}`
    );
    log.info('API Response status for account transactions: ' + res.status());
    expect(res.status()).toBe(200);
    expect(res.ok()).toBeTruthy();
    const responseBody = await res.json();
    log.info('API Response for account transactions: ' + JSON.stringify(responseBody))

    expect(Array.isArray(responseBody)).toBeTruthy();
    Find_Transaction.verify_JSON_responses(responseBody,state.amount_to_pay,accountNumber)
  
  });


  test('Verify if Account Number entered as Invalid', async ({ page, BillPayPage }) => {
    await BillPayPage.goto();
    await BillPayPage.click(test_ids.bill_pay.bill_pay);
    await waitForUrlContains(page, 'billpay.htm');
    await BillPayPage.fill_payee_details({
      [test_ids.bill_pay.payee_name]: state.payee_firstname,
      [test_ids.bill_pay.payee_address]: test_data.location.streetAddress(),
      [test_ids.bill_pay.payee_city]: test_data.location.city(),
      [test_ids.bill_pay.payee_state]: test_data.location.state(),
      [test_ids.bill_pay.payee_zipcode]: test_data.location.zipCode(),
      [test_ids.bill_pay.payee_phone]: test_data.phone.number(),
    });
    await BillPayPage.fill_payment_details({
      [test_ids.bill_pay.payee_account]: test_data.finance.accountNumber(),
      [test_ids.bill_pay.verify_account]: test_data.finance.accountNumber(),
      [test_ids.bill_pay.amount]:state.amount_to_pay,
    });
    await BillPayPage.selectFromAccount(accountNumber);
    await BillPayPage.click_Send_Payment();
    await waitForUrlContains(page, 'billpay.htm');
    await BillPayPage.verifyAccountmismatch();

  })

  test('Verify if Account Number entered as Empty', async ({ page, BillPayPage }) => {
    await BillPayPage.goto();
    await BillPayPage.click(test_ids.bill_pay.bill_pay);
    await waitForUrlContains(page, 'billpay.htm');
    await BillPayPage.fill_payee_details({
      [test_ids.bill_pay.payee_name]: state.payee_firstname,
      [test_ids.bill_pay.payee_address]: test_data.location.streetAddress(),
      [test_ids.bill_pay.payee_city]: test_data.location.city(),
      [test_ids.bill_pay.payee_state]: test_data.location.state(),
      [test_ids.bill_pay.payee_zipcode]: test_data.location.zipCode(),
      [test_ids.bill_pay.payee_phone]: test_data.phone.number(),
    });
    await BillPayPage.fill_payment_details({
      [test_ids.bill_pay.payee_account]: '',
      [test_ids.bill_pay.verify_account]: '',
      [test_ids.bill_pay.amount]:state.amount_to_pay,
    });
    await BillPayPage.selectFromAccount(accountNumber);
    await BillPayPage.click_Send_Payment();
    await waitForUrlContains(page, 'billpay.htm');
    await BillPayPage.verifyAccountEmpty();

  })

});
