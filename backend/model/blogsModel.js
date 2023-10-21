const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  blogTitle: {
    type: String,
    require: [true, "Blog Title is Required"],
  },

  blogDescreption: {
    type: String,
    require: [true, "Blog Title is Required"],
  },
});

const Blog = mongoose.model("Blogs", blogSchema);

module.exports = Blog;
