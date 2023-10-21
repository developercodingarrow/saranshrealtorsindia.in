const express = require("express");
const mongoose = require("mongoose");
const app = express();
const AppError = require("./utils/appErrors");
const globalErrorHandler = require("./utils/errorController");
const ProjectRoutes = require("./routes/ProjetcsRoutes");
const BlogRoutes = require("./routes/BlogRoutes");
const promotionalRoutes = require("./routes/PromotionalRoutes");
const EnquireyFormRoutes = require("./routes/EnquiryFormRoutes");
const UserRoute = require("./routes/UsersRoute");
// Midelwears
app.use(express.json());

// all Routes
app.use("/projects", ProjectRoutes);
app.use("/blogs", BlogRoutes);
app.use("/promotional", promotionalRoutes);
app.use("/enquirey", EnquireyFormRoutes);
app.use("/user", UserRoute);

app.all("*", (req, res, next) => {
  next(new AppError("this is error message ", 404));
});

app.use(globalErrorHandler);
module.exports = app;
