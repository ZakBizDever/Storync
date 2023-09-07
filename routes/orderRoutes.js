const express = require("express");
const Order = require("../models/order");
const router = express.Router();

//GET
router.get("/:id", (req, res) => {
  const { id } = req.params;

  Order.findById(id)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.error("Error saving data:", err);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

//POST

router.post("/", (req, res) => {
  const product = new Order(req.body);

  product
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      console.error("Error saving data:", err);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

//PUT

//DELETE

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  Order.findById(id)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.error("Error saving data:", err);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

module.exports = router;
