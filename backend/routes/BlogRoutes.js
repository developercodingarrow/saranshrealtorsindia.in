const express = require("express");
const router = express.Router();
const BlogController = require("../controllers/BlogController");

// All Project Route
router.get("/", BlogController.allBlogs);
router.post("/create-new-blog", BlogController.createNewBlog);
router.delete("/delete-single-blog", BlogController.deleteSingleBlog);

module.exports = router;
