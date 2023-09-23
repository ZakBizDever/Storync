const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    amount: {
        type: String,
        required: true
    },
    products: {
      type: String,
      required: true  
    }
}, {timestamps: true});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
