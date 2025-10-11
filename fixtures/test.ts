import { test as base, expect, Page, request } from '@playwright/test';
//import defaultConfig from '@config/default';
// Update the path below if the actual file location or casing is different
import { LoginPage } from '../pages/auth/LoginPage';
import { RegisterPage } from '../pages/components/RegisterPage'; 
import { AccountPage } from '../pages/components/AccountPage';


type AppFixtures = {
  loginPage: LoginPage;
  RegisterPage: RegisterPage;
  AccountPage: AccountPage;
  //header: HeaderComponent;
  //toast: ToastComponent;
  //creds: { email: string; pass: string };
  api: ReturnType<typeof request.newContext>;
};

export const test = base.extend<AppFixtures>({
 //creds: async ({}, use) => {
   // await use({ email: defaultConfig.creds.stdUser, pass: defaultConfig.creds.stdPass });
  //},

  loginPage: async ({ page }, use) => { await use(new LoginPage(page)); },
  RegisterPage: async ({ page }, use) => { await use(new RegisterPage(page)); },
  AccountPage: async ({ page }, use) => { await use(new AccountPage(page)); },
  //header: async ({ page }, use) => { await use(new HeaderComponent(page)); },
  //toast: async ({ page }, use) => { await use(new ToastComponent(page)); },

  //api: async ({ playwright }, use) => {
    //const ctx = await playwright.request.newContext({ baseURL: process.env.API_URL });
    //await use(ctx);
    //await ctx.dispose();
  //}
});

export { expect };
