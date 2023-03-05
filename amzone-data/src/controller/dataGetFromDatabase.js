const Product = require("../models/Product");

const fetchDataByCategory = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const ans = await Product.find({ category: data });
      console.log(ans);
      resolve(ans);
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = { fetchDataByCategory };
