import { Page } from "playwright";

export abstract class BasePage{
    readonly page: Page
    constructor(page:Page){
        this.page = page
    }
async navigate(path:string){
    await this.page.goto(path);
}
}