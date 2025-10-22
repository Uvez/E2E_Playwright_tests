import { Page, expect } from '@playwright/test';

export async function waitForNetworkIdle(page: Page) {
  // Simple heuristic
  await page.waitForLoadState('networkidle');
}

export async function waitForUrlContains(page: Page, fragment: string) {
  await page.waitForTimeout(1000);
  await expect(page).toHaveURL(new RegExp(fragment));
}
