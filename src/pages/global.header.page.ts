import {Locator, Page} from "@playwright/test";

class GlobalHeaderPage {
    constructor(private readonly page: Page) {
    }

    private readonly _cartIcon =
        this.page.locator("(//div[@class='ast-cart-menu-wrap']/span[@class='count'])[1]");

    get cartIcon(): Locator {
        return this._cartIcon;
    }
}
export default GlobalHeaderPage;