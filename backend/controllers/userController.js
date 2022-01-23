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
    res.status()
  }


}

export {
  registerUser,
  authUser,
  getUserProfile
}