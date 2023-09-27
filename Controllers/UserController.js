import asyncHandler from "../Middlewares/asynchandler.js";
import ErrorHandler from "../utils/errorHandler.js";
import User from "../Models/User.js";
import sendToken from "../utils/jwtToken.js";
//@desc  Register User
//@route POST /api/users/register
//@access Public
const register = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return next(
      new ErrorHandler("Please Enter all the credentials to Register", 401)
    );
  }
  const userexist = await User.findOne({ email });
  if (userexist) {
    return next(
      new ErrorHandler(
        "User already exist. Please try with different mail",
        409
      )
    );
  }

  const user = await User.create({
    name,
    email,
    password,
  });
  sendToken(user, 200, res);
});

//@desc  Login User
//@route POST /api/users/login
//@access Public
const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  //checking if email and password is entered by the user
  if (!email || !password) {
    return next(new ErrorHandler("Please enter email or password", 400));
  }

  //finding password in database
  const user = await User.findOne({
    email,
  }).select("+password");

  //checking if user does not exists in db
  if (!user) {
    return next(new ErrorHandler("Invalid Email or password", 401));
  }

  //checking if password is correct
  const passwordmatched = await user.comparePassword(password);

  if (!passwordmatched) {
    return next(new ErrorHandler("Invalid Email or password", 401));
  }

  sendToken(user, 200, res);
});

//@desc  Logout User
//@route POST /api/users/logout
//@access Public
const logout = asyncHandler(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
      httpOnly: true,
      secure:true,
      sameSite:"None"
  });

  res.status(200).json({
    success: true,
    message: "Logged out",
  });
});


//@desc  get logged in user
//@route POST /api/users/profile
//@access Private
const getuserProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    user,
  });
});
export { register, loginUser, logout,getuserProfile };
