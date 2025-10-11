import { BasePage } from "../BasePage"
import { test_ids } from "../../data/test-ids";

export class RegisterPage extends BasePage {
    async goto() {
        await this.navigate('/parabank/register.htm')
    }

    async fill_user_details(fields: Record<string, string>) {
        for (const [locator, value] of Object.entries(fields)) {
            await this.type(locator, value);
        }
    }

    async click_Register() {
        await this.click(test_ids.register.registerButton)
    }   

     async click_logout() {
        await this.click(test_ids.account_services.log_out);
    }
}    