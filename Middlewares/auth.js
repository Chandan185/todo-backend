import ErrorHandler from "../utils/errorHandler.js";
import asyncHandler from "./asynchandler.js";
import User from '../Models/User.js';
import jwt from 'jsonwebtoken';
const isAuthenticatedUser = asyncHandler(async (req, res, next) => {
  const { token } = await req.cookies;
  if (!token) {
    return next(new ErrorHandler("Please Login to access this resource", 401));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  req.user = await User.findById(decoded.id);
  next();
});

export default isAuthenticatedUser;