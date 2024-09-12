import express from "express";

import {
  delUserData,
  getUserById,
  getUsersData,
  postUserData,
  updateUserData,
} from "../controllers/user.controller.js";

const userRoute = express.Router();

userRoute.post("/createUser", postUserData);

//get all users
userRoute.get("/getUsers", getUsersData);

//get user by id
userRoute.get("/getUser/:id", getUserById);

//delete user data
userRoute.delete("/delUser/:id", delUserData);

//update User Data
userRoute.put("/updateUser/:id", updateUserData);

export default userRoute;
