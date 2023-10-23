const express = require("express");
const router = express.Router();
const BlogController = require("../controllers/BlogController");
const UserController = require("../controllers/UserController");

// All Project Route
router.get("/", BlogController.allBlogs);
router.get("/single-blog/:blogTitle", BlogController.singleBlog);

router.use(
  UserController.protect,
  UserController.restricTO("admin", "super-admin")
);
router.post(
  "/create-new-blog",
  BlogController.BlogFeatureImage,
  BlogController.createNewBlog
);
router.delete("/delete-single-blog", BlogController.deleteSingleBlog);

module.exports = router;
