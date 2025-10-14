import { Console } from 'console';
import { Locator, Page, expect } from 'playwright/test';

export abstract class BasePage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }
  async navigate(path: string) {
    await this.page.goto(path);
  }

  locator(Selector: string): Locator {
    return this.page.locator(Selector);
  }

  async assertVisible(Selector: string) {
    await expect(this.locator(Selector)).toBeVisible();
  }

  async click(selector: string) {
    await this.locator(selector).waitFor({ state: 'visible' });
    await this.locator(selector).click();
  }

  async type(selector: string, value: string) {
    await this.locator(selector).fill(value);
  }

  async selectOption(selector: string, value: string) {
    await this.locator(selector).click();
    await this.locator(selector).selectOption({label : value});
  }

  async selectDropdownOption(selector: string) {
    await this.locator(selector).click();
    await this.locator(selector).focus(); 
    await this.locator(selector).selectOption({ index: 0 });
  }

  async clickandEnter(selector: string) {

    await this.locator(selector).waitFor({ state: 'visible' });
    await this.locator(selector).click({button: 'left', delay: 100}); ;
  }
}
