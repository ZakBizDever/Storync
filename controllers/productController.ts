import { Request, Response, Document, Model } from '@utils/commonImports';
import JoiService from '../utils/JoiService';
import Product, { IProduct } from '../models/product';

const validationSchema = JoiService.joi.object({
  //name: Joi.string().min(3).required(),
});

const get_product = (req: Request, res: Response) => {
  const { id } = req.params;

  Product.findById(id)
    .then((result: IProduct | null) => {
      if (result === null) {
        res.status(404).send("Nothing found!");
        return;
      }

      res.status(200).json(result);
    })
    .catch((err: Error) => {
      console.error("Error saving data:", err);
      res.status(500).json({ error: "Internal Server Error" });
    });
};

const get_products = (req: Request, res: Response) => {
  Product.find()
    .then((results: (Document & IProduct)[] | null) => {
      res.send(results);
    })
    .catch((err: Error) => console.log("Error retrieving Products : " + err));
};

const get_product_add = (req: Request, res: Response) => {
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
      .then((result: Document) => {
        res.status(201).send(result);
      })
      .catch((err: Error) => {
        console.log("Error saving in DB : " + err);
      });
  } else {
    res.status(400).json({ error: error.details[0].message });
  }
};

const post_product_add = (req: Request, res: Response) => {
  const product = new Product(req.body);

  product
    .save()
    .then((result: Document) => {
      res.status(201).json(result);
    })
    .catch((err: Error) => {
      console.error("Error saving data:", err);
      res.status(500).json({ error: "Internal Server Error" });
    });
};

const delete_product = (req: Request, res: Response) => {
  const { id } = req.params;

  Product.findByIdAndDelete(id)
    .then((result: IProduct | null) => {
      res.status(200).json(result);
    })
    .catch((err: Error) => {
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
