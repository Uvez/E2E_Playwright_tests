import { BasePage } from "../BasePage"
import { test_ids } from "../../data/test-ids";
import { expect } from "@playwright/test";

export class HeaderPage extends BasePage {
    async goto() {
        await this.navigate('parabank/index.htm')
    }
    
}