const express = require("express");
const router = express.Router();
const Controllers = require("../controllers/products.controller");

router.get("/", Controllers.getAllProducts);

router.get("/:id", Controllers.getProductById);

router.post("/", Controllers.createProduct);

router.put("/:id", Controllers.updateProduct);

router.delete("/:id", Controllers.deleteProduct);

module.exports = router;
