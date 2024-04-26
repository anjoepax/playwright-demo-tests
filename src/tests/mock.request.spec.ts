import {test, expect} from "@playwright/test";
import exp = require("node:constants");
import {Env} from "@src/config/env";

test.describe("mock request tests", () => {
    test("test 1", {tag: "@mockRequest"},
        async ({page}) => {

        //Capturing request and response
        // page.on("request", request => console.log(request.url(), request.method()));
        // page.on("response", response => console.log(response.status()));

        //Intercepting request
        // await page.route(/png/, route => route.abort());

        //Adding custom header
        // await page.route("**/*", route => {
        //    const headers = {
        //        ...route.request().headers(),
        //        "test-header": "test-value"
        //    }
        //    route.continue({headers});
        // });


        await page.goto(Env.BASE_URL);
        await page.getByPlaceholder("Username").fill(Env.USERNAME);
        await page.getByPlaceholder("Password").fill(Env.PASSWORD);
        //Mock request
        // await page.route("**/web/index.php/api/v2/dashboard/shortcuts", route => {
        //     route.fulfill({
        //         status: 200,
        //         json: {
        //             "data": {
        //                 "leave.assign_leave": false,
        //                 "leave.leave_list": true,
        //                 "leave.apply_leave": true,
        //                 "leave.my_leave": true,
        //                 "time.employee_timesheet": true,
        //                 "time.my_timesheet": true
        //             },
        //             "meta": [],
        //             "rels": []
        //         }
        //     })
        // });

        // await page.route("**/web/index.php/api/v2/dashboard/shortcuts", async route => {
        //     const response = await route.fetch();
        //     const json = await response.json();
        //     json.data["time.my_timesheet"] = false;
        //     console.log(json);
        //     return route.fulfill({
        //         status:200,
        //         json
        //     });
        // });

        await page.getByRole("button", {name: "Login"}).click();
        await page.waitForTimeout(8_000);
        // await expect(page.getByTitle("My Timesheet").last()).not.toBeVisible();
    });
});