const express = require("express");
const router = express.Router();
const EnquiryController = require("../controllers/EnquiryFormController");

// Create new Enquiry
router.post("/create-enquiry-project", EnquiryController.createEnquiry);

router.get("/get-all-enquires", EnquiryController.getAllEnquiry);

module.exports = router;
