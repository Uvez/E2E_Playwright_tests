import { register } from 'module';

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
    RegisterSuccessMsg:
      "//p[contains(text(),'Your account was created successfully. You are now logged in.')]",
  },
  login: {
    username: "//input[@name='username']",
    password: "//input[@name='password']",
    LoginBtn: "//input[@value='Log In']",
  },
  header: {
    Solutions: "//div[@id='headerPanel']//li[normalize-space(.)='Solutions']",
    AboutUs: "//div[@id='headerPanel']//li[normalize-space(.)='About Us']",
    Services: "//div[@id='headerPanel']//li[normalize-space(.)='Services']",
    Products: "//div[@id='headerPanel']//li[normalize-space(.)='Products']",
    Locations: "//div[@id='headerPanel']//li[normalize-space(.)='Locations']",
    AdminPage: "//div[@id='headerPanel']//li[normalize-space(.)='Admin Page']",
  },
  Home: {
    //logout: "//a[text()='Log Out']"
    Home_Btn: "//a[text()='Home']"
  },
  account_services: {
    Welcome_Messagae: "//p[@class='smallText']",
    new_account: "//a[text()='Open New Account']",
    log_out: "//a[text()='Log Out']",
    accountType: "//select[@id='type']",
    selectAccount: "//select[@id='fromAccountId']",
    accountOverview:"//div[@id='showOverview']//a",
    OpenNewAccountBtn: "//input[@value='Open New Account']",
    account_Success_Msg: "//div[@id='openAccountResult']/h1",
    accountid: "//div[@id='openAccountResult']/p[2]/a",
  },
  account_overview:{
     account_overview: "//a[text()='Accounts Overview']",
     accountOverview: "//div[@id='showOverview']//a",

  },
  transfer_funds: {
    transfer_funds: "//a[text()='Transfer Funds']",
    transfer_amount: "//input[@id='amount']",
    from_Account: "Select#fromAccountId",
    to_account: "//select[@id='toAccountId']",
    transferBtn: "//input[@value='Transfer']",
    transfer_details: "//div[@id='showResult']/p[1]",
    transfer_success_msg: "//div[@id='showResult']/h1",
    error_message:"//div[@id='showError']/p[1]"
  },
  bill_pay: {
    bill_pay: "//a[text()='Bill Pay']",
    payee_name: "//input[@name='payee.name']",
    payee_address: "//input[@name='payee.address.street']",
    payee_city: "//input[@name='payee.address.city']",
    payee_state: "//input[@name='payee.address.state']",
    payee_zipcode: "//input[@name='payee.address.zipCode']",
    payee_phone: "//input[@name='payee.phoneNumber']",
    payee_account: "//input[@name='payee.accountNumber']",
    verify_account: "//input[@name='verifyAccount']",
    amount: "//input[@name='amount']",
    from_account: "//select[@name='fromAccountId']",
    send_payment_btn: "//input[@value='Send Payment']",
    bill_pay_success_msg: "//div[@id='billpayResult']/h1",
    bill_pay_details: "//div[@id='billpayResult']/p[1]",
    error_account_verification: "//span[@id='validationModel-verifyAccount-mismatch']",
    error_valid_account_number:"//span[@id='validationModel-verifyAccount-invalid']",
    error_account_required_message :"//span[@id='validationModel-verifyAccount-empty']"
  },
} as const;
