const mongoose = require("mongoose");
const slugify = require("slugify");

const developerpromotionalpageSchema = new mongoose.Schema({
  pageTitle: {
    type: String,
    require: [true, "Page Title is Required"],
    unique: true,
  },

  slug: {
    type: String,
    require: [true, "slug didn't work"],
    unique: true,
  },

  developer: {
    type: String,
  },

  location: {
    type: String,
  },
  topDescription: {
    type: String,
  },

  bottomDescription: {
    type: String,
  },
});

// slug the pormotional page Title
developerpromotionalpageSchema.pre("save", function (next) {
  this.slug = slugify(this.pageTitle, {
    lower: false,
  });
  next();
});

const DeveloperPromotional = mongoose.model(
  "DeveloperPromotional",
  developerpromotionalpageSchema
);

module.exports = DeveloperPromotional;
