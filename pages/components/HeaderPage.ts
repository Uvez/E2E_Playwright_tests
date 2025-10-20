import { BasePage } from '../BasePage';
import { test_ids } from '../../data/test-ids';
import { expect } from '@playwright/test';
import { waitForUrlContains } from '../../utils/waiters';
import { log } from '../../utils/logger';

export class HeaderPage extends BasePage {
  async goto() {
    try {
      await this.navigate('parabank/index.htm');
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      throw new Error(msg);
      log.warn(msg);
    }
  }

  async click_verify_link(selector: string, expected_link: string) {
    try {
      await this.locator(selector).click();
      await waitForUrlContains(this.page, expected_link);
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      throw new Error(msg);
      log.warn(msg);
    }
  }

  async go_back() {
    await this.page.goBack();
  }
}
