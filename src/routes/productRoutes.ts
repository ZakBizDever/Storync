import { express } from '../../utils/commonImports';

// const express = require("express");
const productController = require("../controllers/productController");

const router = express.Router();

//GET
router.get("/add", productController.get_product_add);
router.get("/all", productController.get_products);
router.get("/:id", productController.get_product);

//POST
router.post("/add", productController.post_product_add);

//DELETE
router.delete("/:id", productController.delete_product);

//PUT

module.exports = router;
