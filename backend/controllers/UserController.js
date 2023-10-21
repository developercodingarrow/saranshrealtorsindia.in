const catchAsync = require("../utils/catchAsync");
const Users = require("../model/userModel");
const jwt = require("jsonwebtoken");
const APPError = require("../utils/appErrors");
const AppError = require("../utils/appErrors");

// Create new user
exports.superAdminRegister = catchAsync(async (req, res, next) => {
  const userName = req.body.userName;
  const UserEmail = req.body.UserEmail;
  const password = req.body.password;
  const passwordConfirm = req.body.passwordConfirm;

  const newUser = await Users.create({
    userName,
    UserEmail,
    password,
    role: "super-admin",
  });

  res.status(200).json({
    status: "Success",
    message: "Super Admin Register sucessfully",
    newUser,
  });
});

// Login Super-Admin
exports.loginSuperAdmin = catchAsync(async (req, res, next) => {
  const { UserEmail, password } = req.body;

  // 1) Check E-mail and password is exist
  if (!UserEmail || !password) {
    return next(new APPError("please provide E-mail and Password "));
  }
  // 2) check user is exist in
  const user = await Users.findOne({ UserEmail }).select("+password");
  // 3) Password Verification
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(
      new AppError("Please enter the valid e-mail or password ", 401)
    );
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.status(200).json({
    status: "Success",
    message: "Super Admin Login sucessfully",
    token,
    user,
  });
});

//
