import { mongoose, Document, Model, Schema } from '../utils/commonImports';

// Defining the interface to represent a product document
interface IProduct extends Document {
  name: string;
  color: string;
  description: string;
  price: number;
  category: string;
  brand: string;
  stockQuantity: number;
  images: string[];
  sku: string;
  weight?: number;
  dimensions?: string;
  attributes?: {
    size?: string;
    color?: string;
  };
  reviews: {
    username: string;
    rating: number;
    comment: string;
    datePosted: Date;
    // Additional review properties
  }[];
  availabilityStatus: string;
  shippingInformation: {
    methods: string[];
    fees?: number;
    estimatedDeliveryTime?: string;
    // Additional shipping-related properties
  };
  discountsAndPromotions: {
    discounts?: number;
    promotionalCodes: string[];
    specialOffers: string[];
    // Additional discount and promotion properties
  };
  relatedProducts: mongoose.Types.ObjectId[];
  productVariations: {
    size?: string;
    color?: string;
    price?: number;
    stockQuantity?: number;
    // Additional variation-specific properties
  }[];
  customFields?: Record<string, any>;
  visibilityStatus: string;
  sellerInfo?: Record<string, any>;
}

// Creating a Mongoose schema for the Product
const productSchema: Schema<IProduct> = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    stockQuantity: {
      type: Number,
      required: true,
    },
    images: {
      type: [String], // An array of image URLs or references
      required: true,
    },
    sku: {
      type: String,
      required: true,
    },
    weight: {
      type: Number,
    },
    dimensions: {
      type: String,
    },
    attributes: {
      size: {
        type: String,
      },
      color: {
        type: String,
      },
    },
    reviews: [
      {
        username: {
          type: String,
        },
        rating: {
          type: Number,
          min: 1, // Minimum rating value
          max: 5, // Maximum rating value
        },
        comment: {
          type: String,
        },
        datePosted: {
          type: Date,
          default: Date.now,
        },
        // Additional properties for reviews can be defined here as needed
      },
    ],
    availabilityStatus: {
      type: String,
      enum: [
        "In stock",
        "Out of stock",
        "Backordered",
        "Pre-order",
        "Discontinued",
        "Limited availability",
        "Coming soon",
        "On sale",
        "Custom value",
      ],
      default: "In stock",
    },
    shippingInformation: {
      methods: {
        type: [String], // An array of available shipping methods
        required: true,
      },
      fees: {
        type: Number, // Shipping fees (if applicable)
      },
      estimatedDeliveryTime: {
        type: String, // Estimated delivery time
      },
      // Add more shipping-related properties as needed
    },
    discountsAndPromotions: {
      discounts: {
        type: Number, // Discount percentage or amount
      },
      promotionalCodes: {
        type: [String], // Array of promotional codes applicable to the product
      },
      specialOffers: {
        type: [String], // Array of special offers or deals
      },
      // Add more properties for discounts and promotions as needed
    },
    relatedProducts: {
      type: [mongoose.Schema.Types.ObjectId], // Array of related product IDs
      ref: "Product", // Reference to the Product model
    },
    productVariations: [
      {
        size: {
          type: String, // Size of the variation (e.g., "Small," "Medium," "Large")
        },
        color: {
          type: String, // Color of the variation
        },
        price: {
          type: Number, // Price for this specific variation
        },
        stockQuantity: {
          type: Number, // Quantity in stock for this variation
        },
        // Add more variation-specific properties as needed
      },
    ],
    customFields: {
      // Add custom fields as needed
    },
    visibilityStatus: {
      type: String,
      enum: [
        "Active",
        "Deactivated",
        "Archived",
        "Draft",
        "Sold Out",
        "Coming Soon",
        "Custom Value",
      ],
      default: "Deactivated",
    },
    sellerInfo: {
      // Define properties related to the seller or vendor
    },
  },
  { timestamps: true }
);

const Product: Model<IProduct> = mongoose.model<IProduct>('Product', productSchema);

export { Product as default, IProduct };
