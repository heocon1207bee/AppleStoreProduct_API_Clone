const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  type: { type: String, required: true },
  price: { type: Number, required: true },
  releaseDate: { type: Date, required: true },
});

module.exports = mongoose.model("Product", productSchema);
