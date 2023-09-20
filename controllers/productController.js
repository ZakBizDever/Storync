const Product = require("../models/product");
const Joi = require("joi");

const validationSchema = Joi.object({
  //name: Joi.string().min(3).required(),
});

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
    name: "Product name",
    color: "Black",
    description: "Product description",
    price: 99,
    category: "Category",
    brand: "Brand",
    stockQuantity: 1000,
    images: ["product_front.png", "product_back.png", "product_top.png"],
    sku: "X-1008Y-AZ",
    shippingInformation: {
      methods: ["Carrier 1", "Carrier 2", "Carrier 3"],
      fees: 25,
      estimatedDeliveryTime: "2-5 Business days.",
    },
  });

  const { error, value } = validationSchema.validate(req.body);

  if (!error) {
    product
      .save()
      .then((result) => {
        res.status(201).send(result);
      })
      .catch((err) => {
        console.log("Error saving in DB : " + err);
      });
  } else {
    res.status(400).json({ error: error.details[0].message });
  }
};

const post_product_add = (req, res) => {
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
  post_product_add,
  delete_product,
};
