import {test, expect} from "@playwright/test";

test.describe("Add to cart tests", () => {

    test("Add product in the Store category page", async ({ page }) => {
        await page.goto('/');
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

    test("Add product in the Men category page", async ({page}) => {
        await page.goto('/');
        await page.locator('#menu-item-1228').getByRole('link', { name: 'Men' }).click();
        await page.getByPlaceholder('Search products…').click();
        await page.getByPlaceholder('Search products…').fill('Jeans');
        await page.getByRole('button', { name: 'Search' }).click();
        await page.getByLabel('Add “Faint Blue Jeans” to').click();
        await page.getByLabel('Add “Faint Blue Jeans” to').click();
        await expect(page.locator('#ast-desktop-header')).toContainText('2');
        await page.getByRole('link', { name: 'View cart' }).click();
        await page.getByLabel('Faint Blue Jeans quantity').fill('1');
        await page.getByRole('button', { name: 'Update cart' }).click();
        await expect(page.locator('#ast-desktop-header')).toContainText('1');
    });

    //Adding comments
    test.skip("Add product in the main product page", async ({page}) => {
        await page.goto('/');
        await page.locator('#menu-item-1229').getByRole('link', { name: 'Women' }).click();
        await page.getByPlaceholder('Search products…').click();
        await page.getByPlaceholder('Search products…').fill('bag');
        await page.getByRole('button', { name: 'Search' }).click();
        await page.getByLabel('Black Over-the-shoulder').click();
        await page.getByLabel('Black Over-the-shoulder').fill('3');
        await page.getByRole('button', { name: 'Add to cart' }).click();
        await expect(page.locator('#ast-desktop-header')).toContainText('3');
        await page.locator('#ast-desktop-header').getByRole('link', { name: 'View cart' }).click();
        await expect(page.locator('#post-1220')).toContainText('$225.00');
    });
});