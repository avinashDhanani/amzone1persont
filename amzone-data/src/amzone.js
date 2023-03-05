const puppeteer = require("puppeteer");
const fs = require("fs");
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto("https://www.amazon.in/s?k=computer");

  // Set screen size
  await page.setViewport({ width: 1080, height: 1024 });
  // s-result-item

  await page.screenshot({ path: "GFG1.png" });

  await page.screenshot({ path: "GFG2.png" });

  const quotes = await page.evaluate(() => {
    // Fetch the first element with class "quote"
    // Get the displayed text and returns it
    const quoteList = document.querySelectorAll(".s-result-item");
    //  const quoteList = e.querySelectorAll(".s-result-item");

    return Array.from(quoteList).map((quote) => {
      if (
        quote.querySelector(".a-link-normal") &&
        quote.querySelector(".a-color-base") &&
        quote.querySelector("img")
      ) {
        const productLink = quote.querySelector(".a-link-normal").href;
        const text = quote.querySelector(".a-color-base").innerText;
        const image = quote.querySelector("img").src;
        return { productLink, text, image };
      }
    });
  });
  const data = quotes.filter((e) => {
    if (e) {
      return true;
    } else {
      return false;
    }
  });
  fs.writeFileSync("computer.json", JSON.stringify(data));

  await page.screenshot({ path: "GFG3.png" });
  await browser.close();
})();
