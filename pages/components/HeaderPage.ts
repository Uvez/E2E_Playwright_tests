import { BasePage } from "../BasePage"
import { test_ids } from "../../data/test-ids";
import { expect } from "@playwright/test";
import { waitForUrlContains } from '../../utils/waiters';

export class HeaderPage extends BasePage {
    async goto() {
        await this.navigate('parabank/index.htm')
    }

    async click_verify_link(selector:string,expected_link:string){
        await this.locator(selector).click()
        await waitForUrlContains(this.page,expected_link)
    }

    async go_back(){
        await this.page.goBack()
    }
}