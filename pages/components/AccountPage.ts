import { BasePage } from '../BasePage';
import { test_ids } from '../../data/test-ids';
import { expect } from '@playwright/test';

export class AccountPage extends BasePage {
  async goto() {
    await this.navigate('/parabank/overview.htm');
  }

  async clickNewAccount() {
    await this.click(test_ids.account_services.new_account);
  }

  async selectAccountType(accountType:string): Promise<void> {
   /* const valueMap = {
      CHECKING: '0',
      SAVINGS: '1',
   };*/
    //await this.selectOption(test_ids.account_services.accountType, valueMap[accountType]);
    await this.click(test_ids.account_services.accountType);
    await this.selectOption(test_ids.account_services.accountType, accountType);
    //await expect(this.locator(test_ids.account_services.accountType)).toHaveValue(
      //valueMap[accountType]
  }

  async clickOpenNewAccount() {
    await this.click(test_ids.account_services.OpenNewAccountBtn);
  }

  async verifyAccountCreation() {
    await this.assertVisible(test_ids.account_services.account_Success_Msg);
    await expect(this.locator(test_ids.account_services.account_Success_Msg)).toHaveText(
      'Account Opened!'
    );
  }

  async getAccountId(): Promise<string> {
    return this.locator(test_ids.account_services.accountid).innerText();
  }

  async clickAccountOverview() {
    await this.click(test_ids.account_services.account_overview);
  }

  async getAccountOverviewLinkById(accountId: string): Promise<string | null> {
    const link = this.page.locator(`//div[@id='showOverview']//a[contains(@href, '${accountId}')]`);
    return link.first().getAttribute('href');
  }
}
