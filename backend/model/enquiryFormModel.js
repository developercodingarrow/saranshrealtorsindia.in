const mongoose = require("mongoose");

const enquiryFormSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "Name is Required"],
  },
  email: {
    type: String,
    require: [true, "E-mail is Required"],
  },
  number: {
    type: String,
    require: [true, "Mobile Number is Required"],
  },

  message: {
    type: String,
  },

  formName: {
    type: String,
    require: [true, "Mobile Number is Required"],
  },

  formlocation: {
    type: String,
    require: [true, "Mobile Number is Required"],
  },
});

const EnquiryForm = mongoose.model("EnquiryForm", enquiryFormSchema);

module.exports = EnquiryForm;
