import express from "express";

import {
  delUserData,
  getUserById,
  getUsersData,
  loginUser,
  //   postUserData,
  registerUser,
  updateUserData,
} from "../controllers/user.controller.js";

const userRoute = express.Router();

// userRoute.post("/createUser", postUserData);

//get all users
userRoute.get("/getUsers", getUsersData);

//get user by id
userRoute.get("/getUser/:id", getUserById);

//delete user data
userRoute.delete("/delUser/:id", delUserData);

//update User Data
userRoute.put("/updateUser/:id", updateUserData);

//registerUser
userRoute.post("/register", registerUser);

// Login user
userRoute.post("/login", loginUser); // Add this route for user login

export default userRoute;
