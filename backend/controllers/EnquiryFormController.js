const catchAsync = require("../utils/catchAsync");
const EnquiryForm = require("../model/enquiryFormModel");

// One Result status Function
const resultStatus = (res, statusCode, msg, result) => {
  res.status(statusCode).json({
    status: "Success",
    total: result.length,
    message: msg,
    result,
  });
};

// Create Enquiry Frm
exports.createEnquiry = catchAsync(async (req, res, next) => {
  const { name, email, number, message, formName, formlocation } = req.body;

  const newEnquiry = new EnquiryForm({
    name,
    email,
    number,
    message,
    formName,
    formlocation,
  });
  const saveEnquiry = await newEnquiry.save();
  resultStatus(res, 200, "created new Enquirey", saveEnquiry);
});

// Get all Enquires
exports.getAllEnquiry = catchAsync(async (req, res, next) => {
  const Enquries = await EnquiryForm.find();
  resultStatus(res, 200, "get all enquires", Enquries);
});
