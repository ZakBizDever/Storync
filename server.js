const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");

//Middleware
app.use(express.urlencoded({ extended: true }));

//MongoDB Atlas cluster URI
mongoose
  .connect(process.env.DB_URI)
  .then((result) => {
    console.log("Connected to Storync DB");
    app.listen(process.env.PORT, () => {
      console.log("Listening to port " + process.env.PORT);
    });
  })
  .catch((err) => console.log("Error : " + err));

//Routes & Logic
//GET
app.get("/api", (req, res) => {
  res.json(["User1", "User2", "User3"]);
});

app.use("/api/product", authenticateToken, productRoutes);
app.use("/api/user", userRoutes);
app.use("/api/order", orderRoutes);

//404
app.use((req, res) => {
  res.status(404).send("No such EndPoint !");
});

//Authentication security
function authenticateToken(req, res, next) {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Authentication failed" });
  }

  console.log(token);

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: err.message });
    }
    req.user = user;
    next();
  });
}
