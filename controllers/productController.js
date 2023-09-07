const Product = require("../models/product");

const get_product = (req, res) => {
  const { id } = req.params;

  Product.findById(id)
    .then((result) => {
      if (!result) {
        res.status(404).send("Nothing found!");
        return;
      }

      res.status(200).json(result);
    })
    .catch((err) => {
      console.error("Error saving data:", err);
      res.status(500).json({ error: "Internal Server Error" });
    });
};

const get_products = (req, res) => {
  Product.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log("Error retrieving Products : " + err));
};

const get_product_add = (req, res) => {
  const product = new Product({
    name: "Sleeve MacBook Pro 13",
    color: "Black",
  });

  product
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log("Error saving in DB : " + err);
    });
};

const post_product = (req, res) => {
  const product = new Product(req.body);

  product
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      console.error("Error saving data:", err);
      res.status(500).json({ error: "Internal Server Error" });
    });
};

const delete_product = (req, res) => {
  const { id } = req.params;

  Product.findByIdAndDelete(id)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.error("Error saving data:", err);
      res.status(500).json({ error: "Internal Server Error" });
    });
};

module.exports = {
  get_product,
  get_products,
  get_product_add,
  post_product,
  delete_product,
};
