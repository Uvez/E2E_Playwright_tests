import { Console } from "console";
import { BasePage } from "./BasePage"

export class RegisterPage extends BasePage{
    async goto(path: string){
        await this.navigate('/parabank/register.htm')
    }

async register(firstname:string,lastname:string,address:string,city:string,state:string,zipcode:string,phone:number,SSN:number)
{
    await this.page.fill("//input[@name='customer.firstName']",firstname);
    await this.page.fill("//input[@name='customer.lastName']",lastname)
    await this.page.fill("//input[@name='customer.address.street']",address)
    await this.page.fill("//input[@name='customer.address.city']",city)
    await this.page.fill("//input[@name='customer.address.state']",state)
    await this.page.fill("//input[@name='customer.address.zipCode']",zipcode)
    await this.page.fill("//input[@name='customer.phoneNumber']",zipcode)
    await this.page.fill("//input[@name='customer.ssn']",typeof(SSN))
    
    await this.page.fill("//input[@name='customer.username']","test123")
    await this.page.fill("//input[@name='customer.password']","test")
    await this.page.fill("//input[@id='repeatedPassword']","test")
   
    await this.page.click("//input[@value='Register']");
   
}
}