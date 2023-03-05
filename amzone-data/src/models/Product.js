const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
  },
  productLink: {
    type: String,
  },
  image: {
    type: String,
  },
  dissPrice: {
    type: String,
  },
  actulePrice: {
    type: String,
  },
  star: {
    type: String,
  },
  desc: {
    type: String,
  },
  category: {
    type: String,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
