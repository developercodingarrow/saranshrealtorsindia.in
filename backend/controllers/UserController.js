const catchAsync = require("../utils/catchAsync");
const Users = require("../model/userModel");
const jwt = require("jsonwebtoken");
const APPError = require("../utils/appErrors");
const AppError = require("../utils/appErrors");
const { promisify } = require("util");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

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

  const token = signToken(user._id);
  res.status(200).json({
    status: "Success",
    message: "Super Admin Login sucessfully",
    token,
    user,
  });
});

// Create New Admin
exports.createAdmin = catchAsync(async (req, res, next) => {
  const userName = req.body.userName;
  const UserEmail = req.body.UserEmail;
  const password = req.body.password;
  const passwordConfirm = req.body.passwordConfirm;

  const newUser = await Users.create({
    userName,
    UserEmail,
    password,
    role: "admin",
  });

  res.status(200).json({
    status: "Success",
    message: " New Admin Register sucessfully",
    newUser,
  });
});

// List of all admins - only Super Admin
exports.getAllAdmins = catchAsync(async (req, res, next) => {
  const allAdmins = await Users.find();

  res.status(200).json({
    status: "Success",
    message: " get List of all admins sucessfully",
    allAdmins,
  });
});

// Delete only admins
exports.deleteAdmins = catchAsync(async (req, res, next) => {
  const { _id } = req.body;

  const user = await Users.findById(_id);

  // Check if the user has the "admin" role
  if (user.role === "admin") {
    const deleteAdmin = await Users.findByIdAndDelete(_id);
    res.status(200).json({
      status: "Success",
      message: "Delete admin sucesfully ",
      deleteAdmin,
    });
  }

  if (user.role === "super-admin") {
    res.status(200).json({
      status: "Success",
      message: "You can't delete Super admin",
    });
  }
});

// delete Multiple adsmins
exports.deleteMultipleAdmins = catchAsync(async (req, res, next) => {
  const { adminIds } = req.body;

  if (!adminIds || !Array.isArray(adminIds) || adminIds.length === 0) {
    return res.status(400).json({
      status: "Error",
      message: "Please provide The Admin List ",
    });
  }

  // Find and delete admins with the provided IDs
  const deletedAdmins = await Users.deleteMany({
    _id: { $in: adminIds },
    role: "admin",
  });

  if (deletedAdmins.deletedCount === 0) {
    return res.status(404).json({
      status: "Error",
      message: "No admin users were found for deletion",
    });
  }

  res.status(200).json({
    status: "Success",
    message: " Detete List of all admins sucessfully",
  });
});

// ACite or Deactive admins
exports.adminStatusAction = catchAsync(async (req, res, next) => {
  const { _id, action } = req.body;
  // Ensure 'action' is either 'activate' or 'deactivate'
  if (action !== "activate" && action !== "deactivate") {
    return res.status(400).json({
      status: "Error",
      message:
        'Invalid action. It should be either "activate" or "deactivate".',
    });
  }

  // If user have super admin
  const checrole = await Users.findById(_id);

  if (checrole.role === "super-admin") {
    return next(
      new AppError("only upadte the status of admins not super admin")
    );
  }

  // Use updateOne to update the user's userStatus
  const user = await Users.findByIdAndUpdate(
    { _id, role: "admin" },
    { $set: { userStatus: action } },
    {
      new: true,
    }
  );
  // If user not found
  if (user.nModified === 0) {
    return res.status(404).json({
      status: "Error",
      message: "User not found",
    });
  }

  res.status(200).json({
    status: "Success",
    message: " user status Update sucessfully",
    user,
  });
});

// Update user E-mail or passsword
exports.updateAdmin = catchAsync(async (req, res, next) => {
  const { UserEmail, password, _id } = req.body;

  // Create an update object to only include fields that are provided in the request
  const updateFields = {};
  if (UserEmail) {
    updateFields.UserEmail = UserEmail;
  }
  if (password) {
    updateFields.password = password;
  }

  const user = await Users.findOneAndUpdate(
    { _id, role: "admin" },
    { $set: updateFields },
    { new: true }
  );

  res.status(200).json({
    status: "Success",
    message: " user status Update sucessfully",
    user,
  });
});

// Protect Controller function
exports.protect = catchAsync(async (req, res, next) => {
  // 1) Geeting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new AppError("You are not logged in ! please Login In first", 401)
    );
  }

  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  console.log(decoded);

  // 3) check user still exist
  const fresUser = await Users.findById(decoded.id);
  if (!fresUser) {
    return next(
      new AppError(
        "Then token belonging to this token user does no longer exist",
        401
      )
    );
  }

  // 4) check if user change password after the token was issued
  // skip this step there is no need to this
  req.user = fresUser;

  next();
});

// all to acces user Role
exports.restricTO = (...roles) => {
  console.log(roles);
  return (req, res, next) => {
    // roles in Array
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to acces this", 403)
      );
    }

    next();
  };
};
