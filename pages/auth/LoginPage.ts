import { BasePage } from "../BasePage"
import { test_ids } from "../../data/test-ids";

export class LoginPage extends BasePage {
  async goto() {
    await this.navigate('/parabank/index.htm')
  }

  async login(email: string, password: string) {
    await this.type(test_ids.login.username, email);
    await this.type(test_ids.login.password, password);
    await this.click(test_ids.login.LoginBtn);
  }

}