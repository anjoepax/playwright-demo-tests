import {Locator, Page} from "@playwright/test";

class ProductPage {
    constructor(private readonly page: Page) {
    }

    private readonly _productLabel = this.page.locator("h1[class='product_title entry-title']");
    private readonly addToCartButton = this.page.locator("button[name='add-to-cart']");

    async clickAddToCartButton() {
        await this.addToCartButton.click();
        await this.page.waitForTimeout(3_000);
    }

    get productLabel(): Locator {
        return this._productLabel;
    }
}

export default ProductPage;