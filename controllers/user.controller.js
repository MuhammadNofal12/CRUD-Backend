import user from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// export const postUserData = async (req, res) => {
//   try {
//     const { name, userName, email, password } = req.body;
//     console.log(name, userName, email, password);
//     const isEmailExisted = await user.findOne({ email: email });
//     if (isEmailExisted) {
//       return res.status(400).json({ message: "Email already existed" });
//     }
//     const userData = new user({
//       ...req.body,
//     });
//     await userData.save();

//     return res
//       .status(200)
//       .json({ message: "data saved successfully", success: true, userData });
//   } catch (error) {
//     res.status(500).json(error.message);
//   }
// };

export const getUsersData = async (req, res) => {
  try {
    const getUsers = await user.find();
    return res.status(200).json({ success: true, getUsers });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

//get user by id
export const getUserById = async (req, res) => {
  try {
    const getUserId = req.params.id;
    const userData = await user.findById(getUserId);
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }
    return res
      .status(200)
      .json({ success: true, userData, message: "got user data" });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

//del user data
export const delUserData = async (req, res) => {
  try {
    const { id } = req.params;
    const delUser = await user.findByIdAndDelete(id);
    if (!delUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully", delUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//update user data
export const updateUserData = async (req, res) => {
  try {
    const { id } = req.params;
    const updateUser = await user.findByIdAndUpdate(id, req.body);

    if (!updateUser) {
      return res.status(404).json({ message: "User not found" });
    }
    const updatedUserData = await user.findById(id);
    res.status(200).json(updatedUserData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//registerUser
// Register a new user
export const registerUser = async (req, res) => {
  try {
    const { name, email, userName, password } = req.body;
    console.log(req.body); // Log the entire request body

    // Check if the user already exists
    const userExists = await user.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await user.create({
      name,
      email,
      userName,
      password: hashedPassword,
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login a user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const existingUser = await user.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare the entered password with the hashed password
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    // const token = jwt.sign(
    //   { userId: existingUser._id, email: existingUser.email },
    //   process.env.JWT_SECRET,
    //   { expiresIn: "1h" }
    // );
    const token = jwt.sign(
      { userId: existingUser._id, email: existingUser.email },
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c", // Replace this with an environment variable for security
      { expiresIn: "1h" }
    );

    // Set the token in a cookie
    res.cookie("token", token, {
      httpOnly: true, // Helps prevent XSS attacks
      secure: process.env.NODE_ENV === "production", // Set to true in production
      maxAge: 3600000, // 1 hour in milliseconds
    });
    // Send response with token
    res.status(200).json({ token, message: "Login successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
