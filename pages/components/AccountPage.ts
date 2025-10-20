import { BasePage } from '../BasePage';
import { test_ids } from '../../data/test-ids';
import test, { expect } from '@playwright/test';
import { log } from '../../utils/logger';

export class AccountPage extends BasePage {
  async goto(): Promise<void> {
    try {
      await this.navigate('/parabank/overview.htm');
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      throw new Error(msg);
      log.warn(msg);
    }
  }

  async clickNewAccount(): Promise<void> {
    try {
      await this.click(test_ids.account_services.new_account);
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      throw new Error(msg);
      log.warn(msg);
    }
  }

  async selectAccountType(accountType: string): Promise<void> {
    try {
      await this.click(test_ids.account_services.accountType);
      await this.selectOption(test_ids.account_services.accountType, accountType);
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      throw new Error(msg);
      log.warn(msg);
    }
  }
  async selectFromAccount(): Promise<void> {
    try {
      await this.click(test_ids.account_services.selectAccount);
      await this.selectDropdownbyIndex(test_ids.account_services.selectAccount,0);
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      throw new Error(msg);
      log.warn(msg);
    }
  }

  async click_New_Account_Button(): Promise<void> {
    try {
      await this.clickandEnter(test_ids.account_services.OpenNewAccountBtn);
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      throw new Error(msg);
      log.warn(msg);
    }
  }

  async verifyAccountCreation(): Promise<void> {
    try {
      await this.assertVisible(test_ids.account_services.account_Success_Msg);
      await expect(this.locator(test_ids.account_services.account_Success_Msg)).toHaveText(
        'Account Opened!'
      );
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      throw new Error(msg);
      log.warn(msg);
    }
  }

  async getAccountId(): Promise<string> {
    try {
      const accountId = this.locator(test_ids.account_services.accountid).innerText();
      return accountId;
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      throw new Error(msg);
      log.warn(msg);
    }
  }

  async clickAccountOverview(): Promise<void> {
    try {
      await this.click(test_ids.account_overview.account_overview);
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      throw new Error(msg);
      log.warn(msg);
    }
  }

  async getAccountOverviewLinkById(accountId: string): Promise<string | null> {
    try {
      const link = this.page.locator(
        `${test_ids.account_services.accountOverview}[contains(@href, '${accountId}')]`
      );
      return link.first().getAttribute('href');
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      throw new Error(msg);
      log.warn(msg);
    }
  }
}
