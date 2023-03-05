const puppeteer = require("puppeteer");
const Product = require("../models/Product");

const Search = async (searchData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();

      await page.goto(`https://www.amazon.in/s?k=${searchData}`);

      await page.setViewport({ width: 1080, height: 1024 });
      await page.screenshot({ path: `${searchData}1.png` });

      const quotes = await page.evaluate(() => {
        const quoteList = document.querySelectorAll(".s-result-item");
        return Array.from(quoteList).map((quote) => {
          if (
            quote.querySelector(".a-link-normal") &&
            quote.querySelector(".a-color-base") &&
            quote.querySelector("img") &&
            quote.querySelector(".a-price-whole") &&
            quote.querySelector(".a-offscreen") &&
            quote.querySelector(".a-icon-star-small")
          ) {
            const productLink = quote.querySelector(".a-link-normal").href;
            const productName = quote.querySelector(".a-color-base").innerText;
            const image = quote.querySelector("img").src;
            const dissPrice = quote.querySelector(".a-price-whole").innerText;
            const actulePrice = quote.querySelector(".a-offscreen").innerText;
            const star = quote.querySelector(".a-icon-star-small").innerText;
            return {
              productLink,
              productName,
              image,
              dissPrice,
              actulePrice,
              star,
            };
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
      await browser.close();
      resolve(data);
    } catch (err) {
      reject(err);
    }
  });
};

const storeData = async (data, category) => {
  return new Promise(async (reslove, reject) => {
    const tempData = data.map((item) => {
      item.category = category;
      return item;
    });
    const storeDataArray = data.map((item) => {
      const tt1 = new Product(item);
      return tt1;
    });
    try {
      await Product.deleteMany({ category });
      Product.insertMany(storeDataArray)
        .then(function () {
          console.log("Successfully saved defult items to DB");
          reslove("ok");
        })
        .catch(function (err) {
          console.log(err);
          reject(err);
        });
    } catch (err) {
      reject(err);
    }
  });
};
const renewDataInDataBase = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await data.map(async (item) => {
        const productData = await Search(item);
        await storeData(productData, item);
      });
      resolve("data stored");
    } catch (err) {
      reject(err);
    }
  });
};
module.exports = { Search, renewDataInDataBase };
