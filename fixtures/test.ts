import { APIRequestContext, test as base, expect, Page, request as pwRequest  } from '@playwright/test';
//import defaultConfig from '@config/default';
// Update the path below if the actual file location or casing is different
import { LoginPage } from '../pages/auth/LoginPage';
import { RegisterPage } from '../pages/components/RegisterPage'; 
import { AccountPage } from '../pages/components/AccountPage';
import { BillPayPage } from '../pages/components/BillPayPage';
import { TransferPage } from '../pages/components/TransferPage';
import {HeaderPage } from '../pages/components/HeaderPage';
//import { HeaderComponent } from '../pages/components/HeaderComponent';
//import { ToastComponent } from '../pages/components/ToastComponent';


type AppFixtures = {
  loginPage: LoginPage;
  RegisterPage: RegisterPage;
  AccountPage: AccountPage;
  BillPayPage: BillPayPage;
  TransferPage: TransferPage;
  HeaderPage: HeaderPage;
  //header: HeaderComponent;
  //toast: ToastComponent;
  //creds: { email: string; pass: string };
  api: APIRequestContext;
};

export const test = base.extend<AppFixtures>({
 //creds: async ({}, use) => {
   // await use({ email: defaultConfig.creds.stdUser, pass: defaultConfig.creds.stdPass });
  //},
  // one context for all tests in the worker

  loginPage: async ({ page }, use) => { await use(new LoginPage(page)); },
  RegisterPage: async ({ page }, use) => { await use(new RegisterPage(page)); },
  AccountPage: async ({ page }, use) => { await use(new AccountPage(page)); },
  BillPayPage: async ({ page }, use) => { await use(new BillPayPage(page)); },
  TransferPage: async ({ page }, use) => { await use(new TransferPage(page)); },
  HeaderPage: async ({ page }, use) => { await use(new HeaderPage(page)); },
});


export { expect };
