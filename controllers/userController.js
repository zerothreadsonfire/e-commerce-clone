import User from "../models/userModel.js";
import { generateToken } from "../utils/generateToken.js";

// @desc    Register a New User
// @route   POST /api/users
// @access  Public 
const registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });

  if(userExists) {
    res.status(400);
    return next(new Error("User Already Exists"));
  }
  
  try {
    const user = await User.create({
      name, 
      email,
      password
    });

    if(user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id)})
    } else {
      res.status(400);
      return next(new Error("Invalid User Data"))
    }
  } catch(e) {
    res.status(400);
    return next(new Error("Please Enter all the Fields."))
  }
}

// @desc    Authenticate User & Get Token
// @route   POST /api/users/login
// @access  Public 
const authUser = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if(user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id)
    })
  } else {
    res.status(401);
    next(new Error("Invalid email or password"));
  }
}

// @desc    Get User Profile
// @route   POST /api/users/profile
// @access  Private
const getUserProfile = async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if(user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(404);
    throw new Error("User not Found");
  }
}

// @desc    Update User Profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if(user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    if(req.body.password) user.password = req.body.password

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id)
    })

  } else {
    res.status(404)
    next(new Error("User Not Found"))
  }
}

// @desc    Get All Users
// @route   POST /api/users
// @access  Private/Admin
const getUsers = async (req, res, next) => {
  const users = await User.find({});
  res.json(users);
  
}

// @desc    Delete User
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if(user) {
    await user.remove();
    res.json({message: "User removed"});
  } else {
    res.status(404);
    throw new Error('User not Found')
  }
}

// @desc    Get User by ID
// @route   POST /api/users/:id
// @access  Private/Admin
const getUserById = async (req, res, next) => {
  const user = await User.findById(req.params.id).select("-password");
  if(user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
}

// @desc    Update User 
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if(user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.isAdmin = req.body.isAdmin

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    })

  } else {
    res.status(404)
    next(new Error("User Not Found"))
  }
}

export {
  registerUser,
  authUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
}
