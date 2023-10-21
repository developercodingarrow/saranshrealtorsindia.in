const express = require("express");
const router = express.Router();
const ProjectController = require("../controllers/ProjectController");

// All Project Route
router.get("/", ProjectController.allProjects);
router.post("/create-new-project", ProjectController.createNewProject);
router.delete("/delete-single-project", ProjectController.deleteSinglProject);

module.exports = router;
