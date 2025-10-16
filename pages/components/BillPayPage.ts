import { BasePage } from "../BasePage"
import { test_ids } from "../../data/test-ids";
import { expect } from "@playwright/test";

export class BillPayPage extends BasePage {
    async goto() {
        await this.navigate('parabank/billpay.htm')
    }

      async fill_payee_details(fields: Record<string, string>) {
        for (const [locator, value] of Object.entries(fields)) {
            await this.type(locator, value);
        }
    }

    async fill_payment_details(fields: Record<string, string>) {
        for (const [locator, value] of Object.entries(fields)) {
            await this.type(locator, value);
        }
    }

    async selectFromAccount(accountNumber:string) {
        await this.selectOption(test_ids.bill_pay.from_account, accountNumber);
    }   

     async click_Send_Payment() {
        await this.click(test_ids.bill_pay.send_payment_btn);
    }

    async verifyPaymentSuccess() {
        await this.assertVisible(test_ids.bill_pay.bill_pay_success_msg);
        await expect(this.locator(test_ids.bill_pay.bill_pay_success_msg)).toHaveText(
          'Bill Payment Complete'
        );
      }

    async verifyPaymentDetails(amount:string, fromAccount:string, toPayee:string) {
        await this.assertVisible(test_ids.bill_pay.bill_pay_details);
        await expect(this.locator(test_ids.bill_pay.bill_pay_details)).toContainText(
          `Bill Payment to ${toPayee} in the amount of $${amount} from account ${fromAccount} was successful.`
        );
      }

}    