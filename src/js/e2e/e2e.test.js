import puppetteer from "puppeteer";
import { fork } from "child_process";

jest.setTimeout(60000);
describe("test popover", () => {
  let browser = null;
  let page = null;
  let server = null;

  const baseUrl = "http://localhost:8888";
  beforeAll(async () => {
    server = fork(`${__dirname}/e2e.server.js`);
    await new Promise((resolve, reject) => {
      server.on("error", reject);
      server.on("message", (message) => {
        if (message === "ok") {
          resolve();
        }
      });
    });
    browser = await puppetteer.launch({
      // headless: false, // show gui
      // slowMo: 1000,
      // devtools: true, // show devTools
    });
    page = await browser.newPage();
  });
  afterAll(async () => {
    await browser.close();
    server.kill();
  });
  test("test click on button", async () => {
    await page.goto(baseUrl);
    const btn = await page.$("#btn-2");
    await btn.click();
    await page.waitForSelector(".popover");
  });
  test("test two click on button", async () => {
    await page.goto(baseUrl);
    const btn = await page.$("#btn-1");
    await btn.click();
    await btn.click();
    await page.waitForSelector(".popover.hidden");
  });
});
