import { expect, Locator } from '@playwright/test';

export async function expectHasText(el: Locator, text: string | RegExp) {
  await expect(el).toHaveText(text);
}
