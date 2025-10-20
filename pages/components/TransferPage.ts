import { BasePage } from "../BasePage"
import { test_ids } from "../../data/test-ids";
import { expect } from "@playwright/test";
import { log } from '../../utils/logger';

export class TransferPage extends BasePage {
    async goto() {
        await this.navigate('parabank/transfer.htm')
    }

    async fill_amount(amount: string) {
        await this.type(test_ids.transfer_funds.transfer_amount, amount);
    }

    async selectToAccount(transferAccountNumber:string) {
        await this.selectOption(test_ids.transfer_funds.to_account, transferAccountNumber);
    }   

    async getFromAccountNumber(): Promise<string> {
        return this.getDropdownOptions(test_ids.transfer_funds.from_Account).then(options => options[0].trim());
    }
     async click_Transfer() {
        await this.click(test_ids.transfer_funds.transferBtn);
    }

    async verifyTransferSuccess() {
        await this.assertVisible(test_ids.transfer_funds.transfer_success_msg);
        await expect(this.locator(test_ids.transfer_funds.transfer_success_msg)).toHaveText(
          'Transfer Complete!'
        );
      }

    async verifyTransferdetails(amount:string, fromAccount:string, toAccount:string) {
        await this.assertVisible(test_ids.transfer_funds.transfer_details);
        await expect(this.locator(test_ids.transfer_funds.transfer_details)).toContainText(
          `$${amount} has been transferred from account #${fromAccount} to account #${toAccount}.`
        );
      }
}    