// utils/select.ts
import { Locator,expect } from '@playwright/test';

export async function selectFirstRealOption(select: Locator) {
  const options = select.locator('option');
  const n = await options.count();
  for (let i = 0; i < n; i++) {
    const o = options.nth(i);
    const label = (await o.textContent())?.trim() ?? '';
    const value = (await o.getAttribute('value')) ?? '';
    if (value && !/select|choose/i.test(label)) {
      await select.selectOption(value);
      return { value, label, index: i };
    }
  }
  throw new Error('No selectable options found.');
}


export async function pickFirstOptionFromDropdown(trigger: Locator, optionIndex = 0) {
  await trigger.click(); // open
  const list = trigger.page().getByRole('option');
  await expect(list).toBeVisible();
  await list.getByRole('option').nth(optionIndex).click(); 
}


export async function selectRandomOption(select: Locator) {
  await expect(select).toBeVisible();

  const options = select.locator('option');
  const count = await options.count();
  if (count === 0) throw new Error('No <option> elements found.');

  const valid: { value: string; label: string; index: number }[] = [];
  for (let i = 0; i < count; i++) {
    const opt = options.nth(i);
    const value = (await opt.getAttribute('value')) ?? '';
    const label = (await opt.textContent())?.trim() ?? '';
    const disabled = (await opt.getAttribute('disabled')) !== null;
    const isPlaceholder = !value || /select|choose|--/i.test(label);
    if (!disabled && !isPlaceholder) valid.push({ value, label, index: i });
  }
  if (valid.length === 0) throw new Error('No selectable options found.');

  const pick = valid[Math.floor(Math.random() * valid.length)];
  await select.selectOption({ value: pick.value });
  return pick;
}