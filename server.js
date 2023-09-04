const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Product = require('./models/product');

//MongoDB Atlas cluster URI
const dbURI = "mongodb+srv://storync:Codelife199@storync.c2wlrvb.mongodb.net/storync?retryWrites=true&w=majority";
mongoose.connect(dbURI)
.then((result) => {
    console.log('Connected to Storync DB');
    app.listen('5050', () => {console.log('Listening to port 5050')});
})
.catch((err) => console.log('Error : ' + err));

app.get('/api', (req, res) => {
    res.json(['User1', 'User2', 'User3']);
});

app.get('/api/add-product', (req, res) => {
    const product = new Product({
        name: 'Sleeve MacBook Pro 13',
        color: 'Black'
    });

    product.save()
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log('Error saving in DB : ' + err);
    });
});

app.get('/api/all-products', (req, res) => {
    Product.find()
    .then((result) => {
        res.send(result);
    })
    .catch((err) => console.log('Error retrieving Products : ' + err))
});
