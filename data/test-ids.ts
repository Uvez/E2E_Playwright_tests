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
        registerSuccessMsg: "//h1[@class='title']"
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
    account_services: {
        container: '[data-testid="toast"]'
    }
} as const;


