import {
  APIRequestContext,
  test as base,
  expect,
  Page,
  request as pwRequest,
} from '@playwright/test';
import { LoginPage } from '../pages/auth/LoginPage';
import { RegisterPage } from '../pages/components/RegisterPage';
import { AccountPage } from '../pages/components/AccountPage';
import { BillPayPage } from '../pages/components/BillPayPage';
import { TransferPage } from '../pages/components/TransferPage';
import { HeaderPage } from '../pages/components/HeaderPage';
import { Find_Transaction } from '../pages/api/find_Transaction';

type test = {
  loginPage: LoginPage;
  RegisterPage: RegisterPage;
  AccountPage: AccountPage;
  BillPayPage: BillPayPage;
  TransferPage: TransferPage;
  HeaderPage: HeaderPage;
  Find_Transaction : Find_Transaction;
  api: APIRequestContext;
};

export const test = base.extend<test>({

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  RegisterPage: async ({ page }, use) => {
    await use(new RegisterPage(page));
  },
  AccountPage: async ({ page }, use) => {
    await use(new AccountPage(page));
  },
  BillPayPage: async ({ page }, use) => {
    await use(new BillPayPage(page));
  },
  TransferPage: async ({ page }, use) => {
    await use(new TransferPage(page));
  },
  HeaderPage: async ({ page }, use) => {
    await use(new HeaderPage(page));
  },
   Find_Transaction: async ({ page }, use) => {
    await use(new Find_Transaction());
  },
});

export { expect };
