import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const protect = async (req, res, next) => {
  let token = req.headers.authorization;
  if(!token || !token.startsWith("Bearer")) return res.status(401).send("You must be logged in to access this page.");

  token = token.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
  } catch(e) {
    return next(new Error("Verification Failed."))
  }

  next();
}

const admin = (req, res, next) => {
  if(req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not Authorized as admin")
  }
}

export {
  protect,
  admin,
}
