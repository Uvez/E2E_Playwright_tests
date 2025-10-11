import { BasePage } from '../BasePage';
import { test_ids } from '../../data/test-ids';

export class AccountPage extends BasePage {
  async goto() {
    await this.navigate('/parabank/overview.htm');
  }

  async clickNewAccount() {
    await this.click(test_ids.account_services.new_account);
  }

  async selectAccountType(accountType: string) {
    await this.selectOption(test_ids.account_services.accountType, accountType);
  }

  async clickOpenNewAccount() {
    await this.click(test_ids.account_services.OpenNewAccountBtn);
  }

  async verifyAccountCreation() {
    await this.assertVisible(test_ids.account_services.account_Success_Msg);
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
