const catchAsync = require("../utils/catchAsync");
const Blog = require("../model/blogsModel");

// One Result status Function
const resultStatus = (res, statusCode, msg, result) => {
  res.status(statusCode).json({
    status: "Success",
    message: msg,
    result,
  });
};

// get All blogs
exports.allBlogs = catchAsync(async (req, res) => {
  const blogs = await Blog.find();
  resultStatus(res, 200, "fetch all Blogs", blogs);
});

// Create new Blog
exports.createNewBlog = catchAsync(async (req, res) => {
  const { blogTitle, blogDescreption } = req.body;
  const newBlog = new Blog({
    blogTitle,
    blogDescreption,
  });

  const saveBlog = await newBlog.save();

  resultStatus(res, 200, "created new Blog", saveBlog);
});

// Delete Single Blog
exports.deleteSingleBlog = catchAsync(async (req, res) => {
  const { id } = req.body;

  const deleteBlog = await Blog.findByIdAndDelete(id);

  resultStatus(res, 404, "delete blog sucesfully", deleteBlog);
});
