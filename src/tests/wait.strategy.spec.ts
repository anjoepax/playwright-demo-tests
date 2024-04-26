import {test, expect} from "@playwright/test";

test.describe("wait demo tests", () => {
    test("wait test 1", async ({page}) => {
        await page.goto(
            "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
            {
                waitUntil: "domcontentloaded"
            }
        );
        await page.waitForLoadState("networkidle");
        await page.waitForURL(/login/);
        await page.waitForTimeout(3_000);
        const request = await page.waitForRequest(/ohrm_log.png/);
        console.log(request.url());
        const response = await page.waitForResponse(/ohrm_log.png/);
        console.log(response.request().url());
        await page.getByPlaceholder("Username123").fill("Admin");
    });
});