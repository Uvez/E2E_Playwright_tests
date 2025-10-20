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
    await this.locator(selector).selectOption({ label: value });
  }

  async selectDropdownbyIndex(selector: string,index:number) {
    await this.locator(selector).click();
    await this.locator(selector).focus();
    await this.locator(selector).selectOption({ index: index });
  }

  async clickandEnter(selector: string) {
    await this.locator(selector).waitFor({ state: 'visible' });
    const button = await this.locator(selector);
    button.dblclick();
  }

  async getDropdownOptions(selector: string): Promise<string[]> {
    const options = await this.$$(selector + ' > option');
    const values = [];
    for (const option of options) {
      values.push((await option.textContent()) || '');
    }
    return values;
  }

  async $$(selector: string): Promise<Locator[]> {
    return this.page.locator(selector).all();
  }

  async waitForUrlContains(page: Page, fragment: string) {
    await expect(page).toHaveURL(new RegExp(fragment));
  }
}
