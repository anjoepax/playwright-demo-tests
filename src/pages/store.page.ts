import {expect, Locator, Page} from "@playwright/test";

class StorePage {
    constructor(private readonly page: Page) {
    }

    private readonly searchInput = this.page.locator("#woocommerce-product-search-field-0");
    private readonly searchButton = this.page.locator("button[value='Search']");
    private readonly viewCartLink = this.page.getByRole('link', { name: 'View cart' }).nth(1);
    private readonly _storePageTitle = this.page.locator("h1[class='woocommerce-products-header__title page-title']");
    private readonly productNames = this.page.locator("h2[class='woocommerce-loop-product__title']");

    async open() {
        await this.page.goto(`store/`)
    }

    async searchForProduct(productName: string) {
        await this.searchInput.fill(productName);
        await this.searchButton.click();
        await this.page.waitForTimeout(3_000);
    }

    async addToCart(productName: string) {
        await this.page.getByLabel(`Add “${productName}” to your cart`).click();
        await this.page.waitForTimeout(4_000);
    }

    async addRandomProductToTheCart() {
        let elementSize = await this.page.$$("(//a[text()='Add to cart'])");
        let index: number;
        if (elementSize.length > 0) {
            index = Math.floor(Math.random() * (elementSize.length));
            await this.page.waitForTimeout(1_000);
            await this.page.locator(`//a[text()='Add to cart']`).nth(index).click();
        }
    }

    async clickViewCartLink() {
        await this.viewCartLink.click();
    }

    async verifyProductNameTextContains(productSearch: string) {
        const listOfProductNames = await this.productNames.all();
        for (const productName of listOfProductNames) {
            const productNameText = await productName.innerText();
            expect(productNameText).toContain(productSearch);
        }
    }

    get storePageTitle(): Locator {
        return this._storePageTitle;
    }
}
export default StorePage;