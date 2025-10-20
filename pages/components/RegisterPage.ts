import { BasePage } from '../BasePage';
import { test_ids } from '../../data/test-ids';
import { log } from '../../utils/logger';
export class RegisterPage extends BasePage {
  async goto() {
    try {
      await this.navigate('/parabank/register.htm');
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      throw new Error(msg);
      log.warn(msg);
    }
  }

  async fill_user_details(fields: Record<string, string>) {
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

  async click_Register() {
    try {
      await this.click(test_ids.register.registerButton);
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      throw new Error(msg);
      log.warn(msg);
    }
  }

  async click_logout() {
    try {
      await this.click(test_ids.account_services.log_out);
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      throw new Error(msg);
      log.warn(msg);
    }
  }
}
