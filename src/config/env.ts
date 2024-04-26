export class Env {
    public static readonly BASE_URL = process.env.URL;
    public static readonly USERNAME = process.env.TEST_USER;
    public static readonly PASSWORD = process.env.PASSWORD;
}

// export const config = {
//     url: process.env.URL ?? "",
//     username: process.env.TEST_USER,
//     password: process.env.PASSWORD
// }