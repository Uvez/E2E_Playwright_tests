import { BasePage } from '../BasePage';
import { test_ids } from '../../data/test-ids';
import { expect } from '@playwright/test';
import { log } from '../../utils/logger';

export class BillPayPage extends BasePage {
  async goto() {
    try {
      await this.navigate('parabank/billpay.htm');
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      throw new Error(msg);
      log.warn(msg);
    }
  }

  async fill_payee_details(fields: Record<string, string>) {
    try {
      for (const [locator, value] of Object.entries(fields)) {
        await this.type(locator, value);
      }
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      throw new Error(msg);
      log.warn(msg);
    }
  }

  async fill_payment_details(fields: Record<string, string>) {
    try {
      for (const [locator, value] of Object.entries(fields)) {
        await this.type(locator, value);
      }
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      throw new Error(msg);
      log.warn(msg);
    }
  }

  async selectFromAccount(accountNumber: string) {
    try {
      await this.selectOption(test_ids.bill_pay.from_account, accountNumber);
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      throw new Error(msg);
      log.warn(msg);
    }
  }

  async click_Send_Payment() {
    try {
      await this.click(test_ids.bill_pay.send_payment_btn);
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      throw new Error(msg);
      log.warn(msg);
    }
  }

  async verifyPaymentSuccess() {
    try {
      await this.assertVisible(test_ids.bill_pay.bill_pay_success_msg);
      await expect(this.locator(test_ids.bill_pay.bill_pay_success_msg)).toHaveText(
        'Bill Payment Complete'
      );
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      throw new Error(msg);
      log.warn(msg);
    }
  }

  async verifyPaymentDetails(amount: string, fromAccount: string, toPayee: string) {
    try {
      await this.assertVisible(test_ids.bill_pay.bill_pay_details);
      await expect(this.locator(test_ids.bill_pay.bill_pay_details)).toContainText(
        `Bill Payment to ${toPayee} in the amount of $${amount} from account ${fromAccount} was successful.`
      );
      log.info(
        `Bill Payment to ${toPayee} in the amount of $${amount} from account ${fromAccount} was successful.`
      );
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      throw new Error(msg);
      log.warn(msg);
    }
  }


  async verifyAccountvalid() {
    try {
      await this.assertVisible(test_ids.bill_pay.error_valid_account_number);
      await expect(this.locator(test_ids.bill_pay.error_valid_account_number)).toContainText(
        'Please enter a valid number.'
      );
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      throw new Error(msg);
      log.warn(msg);
    }
  }

  async verifyAccountmismatch() {
    try {
      await this.assertVisible(test_ids.bill_pay.error_account_verification);
      await expect(this.locator(test_ids.bill_pay.error_account_verification)).toContainText(
        'The account numbers do not match.'
      );
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      throw new Error(msg);
      log.warn(msg);
    }
  }
   async verifyAccountEmpty() {
    try {
      await this.assertVisible(test_ids.bill_pay.error_account_required_message);
      await expect(this.locator(test_ids.bill_pay.error_account_required_message)).toContainText(
        'Account number is required.'
      );
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      throw new Error(msg);
      log.warn(msg);
    }
  }

}
