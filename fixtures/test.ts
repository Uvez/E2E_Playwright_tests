import { APIRequestContext, test as base, expect, Page, request as pwRequest  } from '@playwright/test';
//import defaultConfig from '@config/default';
// Update the path below if the actual file location or casing is different
import { LoginPage } from '../pages/auth/LoginPage';
import { RegisterPage } from '../pages/components/RegisterPage'; 
import { AccountPage } from '../pages/components/AccountPage';
import { BillPayPage } from '../pages/components/BillPayPage';
import { TransferPage } from '../pages/components/TransferPage';
import {header } from '../pages/components/Header';
//import { HeaderComponent } from '../pages/components/HeaderComponent';
//import { ToastComponent } from '../pages/components/ToastComponent';


type AppFixtures = {
  loginPage: LoginPage;
  RegisterPage: RegisterPage;
  AccountPage: AccountPage;
  BillPayPage: BillPayPage;
  TransferPage: TransferPage;
  header: header;
  //header: HeaderComponent;
  //toast: ToastComponent;
  //creds: { email: string; pass: string };
  api: APIRequestContext;
};

export const test = base.extend<AppFixtures>({
 //creds: async ({}, use) => {
   // await use({ email: defaultConfig.creds.stdUser, pass: defaultConfig.creds.stdPass });
  //},

  loginPage: async ({ page }, use) => { await use(new LoginPage(page)); },
  RegisterPage: async ({ page }, use) => { await use(new RegisterPage(page)); },
  AccountPage: async ({ page }, use) => { await use(new AccountPage(page)); },
  BillPayPage: async ({ page }, use) => { await use(new BillPayPage(page)); },
  TransferPage: async ({ page }, use) => { await use(new TransferPage(page)); },
  header: async ({ page }, use) => { await use(new header(page)); },
  //header: async ({ page }, use) => { await use(new HeaderComponent(page)); },
  //toast: async ({ page }, use) => { await use(new ToastComponent(page)); },


  /*api: async ({ playwright }, use) => {
    const api = await playwright.request.newContext({ baseURL: process.env.API_GET_URL,
      extraHTTPHeaders: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },  
    });
    await use(api as any);
    await api.dispose();
  },*/

  api: [async ({}, use) => {
    const api = await pwRequest.newContext({
      baseURL: process.env.API_GET_URL ?? 'https://parabank.parasoft.com/parabank/services_proxy/bank/accounts/',
      extraHTTPHeaders: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      // storageState: 'storageState.api.json', // if you rely on cookies
    });
  console.info('[api] created');
    try {
      await use(api);          // valid for the entire test
    } finally {
      console.info('[api] disposing');
      await api.dispose();     // disposed right after the test
      console.info('[api] disposed');
    }
  }, { scope: 'test' }],

});
//https://parabank.parasoft.com/parabank/services_proxy/bank/accounts/17007/transactions/amount/50


export { expect };
