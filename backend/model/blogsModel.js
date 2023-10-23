const mongoose = require("mongoose");
const slugify = require("slugify");

const blogSchema = new mongoose.Schema({
  blogTitle: {
    type: String,
    require: [true, "Blog Title is Required"],
  },

  slug: {
    type: String,
    require: [true, "slug didn't work"],
    unique: true,
  },

  blogDescreption: {
    type: String,
    require: [true, "Blog Title is Required"],
  },

  // Image field to store the image data
  image: {
    data: Buffer, // Binary image data
    contentType: String, // Image content type (e.g., image/jpeg, image/png)
    altText: String,
  },
});

// slug the pormotional page Title
blogSchema.pre("save", function (next) {
  this.slug = slugify(this.blogTitle, {
    lower: false,
  });
  next();
});

const Blog = mongoose.model("Blogs", blogSchema);

module.exports = Blog;
