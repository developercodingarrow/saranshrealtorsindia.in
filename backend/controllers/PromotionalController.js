const DeveloperPromotional = require("../model/developerpromotionalModel");
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

// Create new Promotional Page
exports.createPromotinalPage = catchAsync(async (req, res, next) => {
  const { pageTitle, developer, topDescription, bottomDescription, location } =
    req.body;

  const newPromotionalPage = new DeveloperPromotional({
    pageTitle,
    developer,
    location,
    topDescription,
    bottomDescription,
  });
  const saveNewPromotionalPage = await newPromotionalPage.save();
  resultStatus(
    res,
    201,
    "created new Pormotional page",
    saveNewPromotionalPage
  );
});

// Get All Promotional Page
exports.allPromotionalPages = catchAsync(async (req, res, next) => {
  const promotionalPages = await DeveloperPromotional.find();
  resultStatus(res, 200, "all promotional pages", promotionalPages);
});

// Delete Single Blog
exports.deleteSinglPromotionalpage = catchAsync(async (req, res, next) => {
  const { id } = req.body;

  const deletePromotionalpage = await DeveloperPromotional.findByIdAndDelete(
    id
  );

  resultStatus(
    res,
    404,
    "delete promotional page sucesfully",
    deletePromotionalpage
  );
});

// get single Promotional page
exports.getSinglePromotionalPage = catchAsync(async (req, res, next) => {
  const { slug } = req.params;
  // get project by Title

  const promotionalPage = await DeveloperPromotional.findOne({ slug });
  let developerProjects;

  if (req.originalUrl.split("/")[3] === "developer") {
    // list of all project by developer
    developerProjects = await Project.find({
      developer: promotionalPage.developer,
    });
  } else if (req.originalUrl.split("/")[3] === "location") {
    // list of all project by Location
    console.log(req.originalUrl.split("/")[3]);
    developerProjects = await Project.find({
      ProjectLocation: promotionalPage.location,
    });
  }

  res.status(200).json({
    developer: promotionalPage.developer,
    status: "Success",
    promotionalPage,
    developerProjects,
  });
});
