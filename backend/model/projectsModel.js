const mongoose = require("mongoose");
const slugify = require("slugify");

const projectSchema = new mongoose.Schema({
  projectName: {
    type: String,
    require: [true, "Property Name is Required"],
  },

  slug: {
    type: String,
    require: [true, "slug didn't work"],
    unique: true,
  },

  Featured: {
    type: String,
    enum: ["yes", "no"],
    default: "yes",
  },

  ProjectType1: {
    type: String,
    enum: ["luxury"],
    default: "luxury",
  },

  ProjectType2: {
    type: String,
    enum: ["commercial", "Residential"],
    default: "Residential",
  },

  ProjectStatus: {
    type: String,
    enum: ["Upcoming Project", "Under Construction", "Ready to Move"],
    default: "Upcoming Project",
  },

  developer: {
    type: String,
    require: [true, "Developer Name is Required"],
  },

  ProjectLocation: {
    type: String,
    require: [true, "Project Location Name is Required"],
  },

  Budget: {
    type: String,
    require: [true, "Budget Value is Required"],
  },

  RERANo: {
    type: String,
  },

  ProjectArea: {
    type: String,
  },

  BasicPrice: {
    type: String,
  },

  NoofFloors: {
    type: String,
  },

  NoofUnits: {
    type: String,
  },

  UnitType: {
    type: String,
  },

  FlatSizeRange: {
    type: String,
  },

  Possession: {
    type: String,
  },
});

// slug the pormotional page Title
projectSchema.pre("save", function (next) {
  this.slug = slugify(this.projectName, {
    lower: false,
  });
  next();
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
