import { register } from "module";

export const test_ids = {
    register: {
        firstname: "//input[@name='customer.firstName']",
        lastname: "//input[@name='customer.lastName']",
        address: "//input[@name='customer.address.street']",
        city: "//input[@name='customer.address.city']",
        state: "//input[@name='customer.address.state']",
        zipcode: "//input[@name='customer.address.zipCode']",
        phone: "//input[@name='customer.phoneNumber']",
        SSN: "//input[@name='customer.ssn']",
        username: "//input[@name='customer.username']",
        password: "//input[@name='customer.password']",
        confirmPassword: "//input[@id='repeatedPassword']",
        registerButton: "//input[@value='Register']",
        WelcomeMsg: "//h1[@class='title']",
        RegisterSuccessMsg: "//p[contains(text(),'Your account was created successfully. You are now logged in.')]"
    },
    login: {
        username: "//input[@name='username']",
        password: "//input[@name='password']",
        LoginBtn: "//input[@value='Log In']"
    },
    header: {
        Solutions: "//div[@id='headerPanel']//li[normalize-space(.)='Solutions']",
        AboutUs: "//div[@id='headerPanel']//li[normalize-space(.)='About Us']",
        Services: "//div[@id='headerPanel']//li[normalize-space(.)='Services']",
        Products: "//div[@id='headerPanel']//li[normalize-space(.)='Products']",
        Locations: "//div[@id='headerPanel']//li[normalize-space(.)='Locations']",
        AdminPage: "//div[@id='headerPanel']//li[normalize-space(.)='Admin Page']",

    },
    Home:{
        //logout: "//a[text()='Log Out']"
    },
    account_services: {
        Welcome_Messagae: "//p[@class='smallText']",
        new_account: "//a[text()='Open New Account']",
        account_overview: "//a[text()='Accounts Overview']",
        transfer_funds: "//a[text()='Transfer Funds']",
        bill_pay: "//a[text()='Bill Pay']",
        log_out: "//a[text()='Log Out']",
        accountType: "//select[@id='type']",
        OpenNewAccountBtn: "//input[@value='Open New Account']",
        account_Success_Msg:"//div[@id='openAccountResult']/h1",
        accountid:"//div[@id='openAccountResult']/p[2]/a",
        accountOverview: "//div[@id='showOverview']//a"
    }
} as const;


