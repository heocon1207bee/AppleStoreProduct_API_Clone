const express = require("express");
const app = express();
const mongoose = require("mongoose");
const productRouter = require("./src/routes/product.router"); // Import router mới

mongoose.connect("mongodb://localhost:27017/apple-products");

// Middleware để xử lý JSON requests
app.use(express.json());

// Sử dụng router cho endpoint /products
app.use("/products", productRouter);

app.listen(3000, () => {
  console.log("API đang chạy trên cổng 3000");
});
