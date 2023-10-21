const Project = require("../model/projectsModel");
const catchAsync = require("../utils/catchAsync");

// One Result status Function
const resultStatus = (res, statusCode, msg, result) => {
  res.status(statusCode).json({
    status: "Success",
    message: msg,
    result,
  });
};

// All Property Projects
exports.allProjects = catchAsync(async (req, res) => {
  const properties = await Project.find();
  resultStatus(res, 200, "fetch all projects", properties);
});

// Create a new Project
exports.createNewProject = catchAsync(async (req, res) => {
  const { projectName, ProjectLocation, Budget, developer } = req.body;
  const newProject = new Project({
    projectName,
    ProjectLocation,
    Budget,
    developer,
  });
  const saveProject = await newProject.save();
  resultStatus(res, 200, "created new projects", saveProject);
});

// Delete Single Blog
exports.deleteSinglProject = catchAsync(async (req, res) => {
  const { id } = req.body;

  const deleteProject = await Project.findByIdAndDelete(id);

  resultStatus(res, 404, "delete project sucesfully", deleteProject);
});
