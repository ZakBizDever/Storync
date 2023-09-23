import { Request, Response } from '@utils/commonImports';
import JoiService from '../utils/JoiService';
import User from '../models/user';

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const validationSchema = JoiService.joi.object({
  //name: Joi.string().min(3).required()
});

const get_user = (req: Request, res: Response) => {
  const { id } = req.params;

  User.findById(id)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.error("Error saving data:", err);
      res.status(500).json({ error: "Internal Server Error" });
    });
};

const register_user = async (req: Request, res: Response) => {
  try {
    const { firstname, lastname, email, username, password } = req.body;

    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({
      firstname,
      lastname,
      email,
      username,
      password: hashedPassword,
    });
    await user.save();

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY);

    res.status(201).json({ token });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const login_user = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Check if the provided password matches the hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY);

    res.status(200).json({ token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const delete_user = (req: Request, res: Response) => {
  const { id } = req.params;

  User.findById(id)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.error("Error saving data:", err);
      res.status(500).json({ error: "Internal Server Error" });
    });
};

module.exports = {
  get_user,
  register_user,
  login_user,
  delete_user,
};
