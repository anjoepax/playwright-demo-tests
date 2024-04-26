import {expect, Locator, Page} from "@playwright/test";
import CheckoutPage from "@src/pages/checkout.page";

class CartPage {
    constructor(private readonly page: Page) {
    }

    private readonly productNames = this.page.locator(`//td[@class='product-name']/a`);
    private readonly productQuantities = this.page.locator(`//div[@class='quantity']//input`);
    private readonly proceedToCheckoutButton = this.page.locator(`a[class='checkout-button button alt wc-forward']`);
    private readonly _productName = this.page.locator(`td[class='product-name'] a`);

    async open() {
        await this.page.goto(`cart/`)
    }

    async printProductNames() {
        console.log("Selected products:");
        const elementCount = await this.productNames.all();
        for (const product of elementCount) {
            const name = await product.innerText();
            console.log(name);
            expect(name).not.toEqual("");
        }
    }


    async printProductQuantities() {
        console.log("Product quantities:");
        const quantities = await this.productQuantities.all();
        for (const quantity of quantities) {
            const quantityText = await quantity.getAttribute("value");
            console.log(quantityText);
            expect(quantityText).not.toEqual("");
        }
    }

    async goToCheckoutPage() {
        await this.proceedToCheckoutButton.click();
        return new CheckoutPage(this.page);
    }


    get productName(): Locator {
        return this._productName;
    }
}

export default CartPage;