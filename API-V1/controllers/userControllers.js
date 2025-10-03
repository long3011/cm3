const User = require("../models/userModel");
const mongoose = require("mongoose");

//GET / users;
const getAllUsers = async (req, res) => {
  //res.send("getAllUsers");
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        if (error.name === "ValidationError") {
          return res.status(400).json({ error: error.message });
        }
        res.status(500).json({ error: "Internal server error" });
      }
      
};

// POST /users
const createUser = async (req, res) => {
  //res.send("createUser");
  try {
    const { name, username, password, phone_number, gender, date_of_birth, membership_status, bio, address, profile_picture } = req.body;
    const newUser = await User.create({
        name,
        username,
        password,
        phone_number,
        gender,
        date_of_birth,
        membership_status,
        bio,
        address,
        profile_picture
      });
      
    res.status(201).json({"message": "User created successfully", user: newUser});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST /users/login
const loginUser = async (req, res) => {
    //res.send("loginUser");
    try {
        const { username, password } = req.body;
        const user = await User.login(username, password);
        res.status(200).json({ message: "Login successful", user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// GET /users/:userId
const getUserById = async (req, res) => {
  //res.send("getUserById");
  
    const { userId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
    }
    try {
        const user = await User.findById(userId);
        if (user) {
            res.status(200).json(user);
        } else {
            return res.status(404).json({ message: "User not found" });
        }
  } catch (error) {
        return res.status(500).json({ message: "Failed to retrieve user" });
  }
};

// PUT /users/:userId
const updateUser = async (req, res) => {
  //res.send("updateUser");

    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
    } 
    
    try {
    const updatedUser = await User.findOneAndUpdate(
        { _id: userId },
        { ...req.body },
        { new: true }
      );
    if (updatedUser) {
        res.status(200).json(updatedUser);
    }
    else {
        return res.status(404).json({ message: "User not found"})
    }
    
  } catch {
    return res.status(500).json({ message: "Failed to update user" });
  }
};

// DELETE /users/:userId
const deleteUser = async (req, res) => {
  //res.send("deleteUser");
  
  const { userId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
    }

    try {
        const deletedUser = await User.findOneAndDelete({ _id: userId });
        if (deletedUser) {
            res.status(200).json({ message: "User deleted successfully" });
        }

    } catch {
        return res.status(500).json({ message: "Failed to delete user" });
    }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  loginUser,
  updateUser,
  deleteUser,
};
