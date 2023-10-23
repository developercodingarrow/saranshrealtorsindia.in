const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");

router.post("/super-admin-register", UserController.superAdminRegister);
router.post("/super-admin-login", UserController.loginSuperAdmin);

// Create admins -By Supr Admin
router.post(
  "/new-admin-create",
  UserController.protect,
  UserController.restricTO("super-admin"),
  UserController.createAdmin
);

router.get(
  "/get-all-admins",
  UserController.protect,
  UserController.restricTO("super-admin"),
  UserController.getAllAdmins
);

// DELETE SINGLE ADMIN
router.delete(
  "/delete-admin",
  UserController.protect,
  UserController.restricTO("super-admin"),
  UserController.deleteAdmins
);

// DELETE MULTIPLE ADMIN
router.delete(
  "/delete-multiple-admins",
  UserController.protect,
  UserController.restricTO("super-admin"),
  UserController.deleteMultipleAdmins
);

// Update user Status Active or DeActive
router.patch(
  "/update-admin-status-action",
  UserController.protect,
  UserController.restricTO("super-admin"),
  UserController.adminStatusAction
);

// Update user Status Active or DeActive
router.patch(
  "/update-admin-password",
  UserController.protect,
  UserController.restricTO("super-admin"),
  UserController.updateAdmin
);
module.exports = router;
