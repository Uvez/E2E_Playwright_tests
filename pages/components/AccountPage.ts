import { BasePage } from '../BasePage';
import { test_ids } from '../../data/test-ids';
import test, { expect } from '@playwright/test';
import { pickFirstOptionFromDropdown, selectFirstRealOption, selectRandomOption } from '../../utils/select';

export class AccountPage extends BasePage {
  async goto() {
    await this.navigate('/parabank/overview.htm');
  }

  async clickNewAccount() {
    await this.click(test_ids.account_services.new_account);
  }

  async selectAccountType(accountType: string): Promise<void> {
    await this.click(test_ids.account_services.accountType);
    await this.selectOption(test_ids.account_services.accountType,accountType);
    //await selectFirstRealOption(this.locator(test_ids.account_services.accountType));
  }
  async SelectFromAccount(): Promise<void> {

    await this.click(test_ids.account_services.selectAccount);
    await this.selectDropdownOption(test_ids.account_services.selectAccount)
    
  }


  async click_New_Account_Button(): Promise<void>{
    await this.clickandEnter(test_ids.account_services.OpenNewAccountBtn);
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
    await this.click(test_ids.account_overview.account_overview);
  }

  async getAccountOverviewLinkById(accountId: string): Promise<string | null> {
    const link = this.page.locator(`//div[@id='showOverview']//a[contains(@href, '${accountId}')]`);
    return link.first().getAttribute('href');
  }
}
