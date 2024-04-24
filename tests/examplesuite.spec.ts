import {test, expect} from "@playwright/test";

test.describe("Regression Tests", () => {
    test('Test Case 2', async ({ page }) => {
        await page.goto('https://askomdch.com/');
        await page.getByRole('link', { name: 'Store' }).click();
        await page.getByPlaceholder('Search products…').click();
        await page.getByPlaceholder('Search products…').fill('Blue');
        await page.getByRole('button', { name: 'Search' }).click();
        await page.getByLabel('Add “Blue Shoes” to your cart').click();
        await page.getByRole('link', { name: 'View cart' }).click();
        await expect(page.locator('#post-1220')).toContainText('Blue Shoes');
        await page.getByLabel('Remove this item').click();
        await expect(page.locator('#ast-desktop-header')).toContainText('0');
        await page.locator('#menu-item-1226').getByRole('link', { name: 'Home' }).click();
    });
});