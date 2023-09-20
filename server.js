const express = require("express");
const app = express();
const mongoose = require("mongoose");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");

//Middleware
app.use(express.urlencoded({ extended: true }));

//MongoDB Atlas cluster URI
const dbURI =
  "mongodb+srv://storync:password@storync.c2wlrvb.mongodb.net/storync?retryWrites=true&w=majority";
mongoose
  .connect(dbURI)
  .then((result) => {
    console.log("Connected to Storync DB");
    app.listen("5050", () => {
      console.log("Listening to port 5050");
    });
  })
  .catch((err) => console.log("Error : " + err));

//Routes & Logic
//GET
app.get("/api", (req, res) => {
  res.json(["User1", "User2", "User3"]);
});

app.use("/api/product", productRoutes);
app.use("/api/user", userRoutes);
app.use("/api/order", orderRoutes);

//404
app.use((req, res) => {
  res.status(404).send("No such EndPoint !");
});
