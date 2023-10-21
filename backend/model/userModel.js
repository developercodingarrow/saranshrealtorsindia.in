const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    require: [true, "Blog Title is Required"],
  },

  UserEmail: {
    type: String,
    require: [true, "Blog Title is Required"],
  },

  role: {
    type: String,
    enum: ["admin", "super-admin"],
    default: "admin",
  },

  password: {
    type: String,
    require: [true, "please provide your password"],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    require: [true, "Please confirm your password"],
    validate: {
      validator: function (el) {
        return el == this.password;
      },
      message: "confirm password didn't match",
    },
  },

  userStatus: {
    type: String,
    enum: ["activate", "deactivate"],
    default: "activate",
  },
});

userSchema.pre("save", async function (next) {
  // This can run only when create or update password filed otherwise no
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;

  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const Users = mongoose.model("Users", userSchema);

module.exports = Users;
