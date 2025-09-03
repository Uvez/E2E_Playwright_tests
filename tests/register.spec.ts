import { test, expect } from '@playwright/test';
import { RegisterPage } from '../pages/RegisterPage'

test('user can register', async ({ page }) => {
  const register = new RegisterPage(page);
  await register.goto('');
 await register.register('Test','Shaikh','India','Mumbai','Mumbai','12345',345678,456793)
});