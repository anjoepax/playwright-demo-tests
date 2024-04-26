import {Locator, Page} from "@playwright/test";
import {CustomerData} from "@src/data/customer.data";
import {Env} from "@src/config/env";

class CheckoutPage {

    constructor(private readonly page: Page) {}

    private readonly loginLink = this.page.locator(`a[class='showlogin']`);
    private readonly firstNameField = this.page.locator(`#billing_first_name`);
    private readonly lastNameField = this.page.locator(`#billing_last_name`);
    private readonly companyField = this.page.locator(`#billing_company`);
    private readonly countryRegionDropdown = this.page.locator(`#billing_country`);
    private readonly streetAddressField1 = this.page.locator(`#billing_address_1`);
    private readonly streetAddressField2 = this.page.locator(`#billing_address_2`);
    private readonly cityField = this.page.locator(`#billing_city`);
    private readonly stateDropdown = this.page.locator(`#billing_state`);
    private readonly zipCodeField = this.page.locator(`#billing_postcode`);
    private readonly phoneField = this.page.locator(`#billing_phone`);
    private readonly emailField = this.page.locator(`#billing_email`);
    private readonly notesField = this.page.locator(`#order_comments`);
    private readonly usernameField = this.page.locator(`#username`);
    private readonly passwordField = this.page.locator(`#password`);
    private readonly loginButton = this.page.locator(`button[name='login']`);
    private readonly placeOrderButton = this.page.locator(`#place_order`);
    private readonly _orderSuccessMsg = this.page.locator(`p[class='woocommerce-notice woocommerce-notice--success woocommerce-thankyou-order-received']`)

    async open() {
        await this.page.goto(`checkout/`);
    }

    async fillUpBillingDetails(customerData : CustomerData) {
        await this.firstNameField.fill(customerData.firstName);
        await this.lastNameField.fill(customerData.lastName);
        await this.companyField.fill("Sample Company");
        await this.countryRegionDropdown.selectOption(customerData.countryRegion);
        await this.streetAddressField1.fill(customerData.streetAddress1);
        await this.streetAddressField2.fill(customerData.streetAddress2);
        await this.cityField.fill(customerData.townCity);
        await this.stateDropdown.selectOption(customerData.state);
        await this.zipCodeField.fill(customerData.zipCode);
        await this.phoneField.fill(customerData.phoneNumber);
        await this.emailField.fill(customerData.emailAddress);
        await this.notesField.fill(customerData.notes);
    }

    async clickPlaceOrderButton() {
        await this.placeOrderButton.click();
    }

    async login() {
        await this.loginLink.click();
        await this.usernameField.fill(Env.USERNAME);
        await this.passwordField.fill(Env.PASSWORD);
        await this.loginButton.click();
    }


    get orderSuccessMsg(): Locator {
        return this._orderSuccessMsg;
    }
}
export default CheckoutPage;
