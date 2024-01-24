const Product = require("../models/product.model");

module.exports = {
  getAllProducts: async (req, res) => {
    if (req.query) {
      const query = req.query;
      const queryKey = Object.keys(query);
      const queryObject = {};
      queryKey.forEach((key, index) => {
        queryObject[key] = query[key];
      });
      const product = await Product.find(queryObject);
      res.json(product);
    } else {
      const products = await Product.find();
      res.json(products);
    }
  },
  getProductById: async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404).send("Product not found!");
      return;
    }
    res.json(product);
  },
  createProduct: async (req, res) => {
    const product = new Product({
      name: req.body.name,
      type: req.body.type,
      price: req.body.price,
      releaseDate: new Date(req.body.releaseDate),
    });
    await product
      .save()
      .then(() => {
        res.status(201).send("Product created");
      })
      .catch((err) => {
        if (err.code === 11000) {
          res.status(400).send("Product with the same name already exists!");
        } else {
          res.status(500).send("Something went wrong");
        }
      });
  },
  updateProduct: async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404).send("Product not found!");
      return;
    }
    product.name = req.body.name || product.name;
    product.type = req.body.type || product.type;
    product.price = req.body.price || product.price;
    product.releaseDate = new Date(req.body.releaseDate) || product.releaseDate;
    await product
      .save()
      .then(() => res.status(200).send("Product updated!"))
      .catch((err) => res.status(500).send("Something went wrong!"));
    res.status(200).send("Product updated");
  },
  deleteProduct: async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404).send("Product not found");
      return;
    }
    await product.remove();
    res.status(200).send("Product deleted");
  },
};
