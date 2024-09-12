import user from "../models/user.model.js";

export const postUserData = async (req, res) => {
  try {
    const { name, userName, email, password } = req.body;
    console.log(name, userName, email, password);
    const isEmailExisted = await user.findOne({ email: email });
    if (isEmailExisted) {
      return res.status(400).json({ message: "Email already existed" });
    }
    const userData = new user({
      ...req.body,
    });
    await userData.save();

    return res
      .status(200)
      .json({ message: "data saved successfully", success: true, userData });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

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
