const express = require("express");
const router = express.Router();
const PromotionalController = require("../controllers/PromotionalController");

// Create developer pormotional page
router.post(
  "/create-new-developer-promotional-page",
  PromotionalController.createPromotinalPage
);

router.get(
  "/get-all-promotional-pages",
  PromotionalController.allPromotionalPages
);

router.get(
  "/get-single-promotional-page/developer/:slug",
  PromotionalController.getSinglePromotionalPage
);

router.get(
  "/get-single-promotional-page/location/:slug",
  PromotionalController.getSinglePromotionalPage
);

router.delete(
  "/delete-promotional-page",
  PromotionalController.deleteSinglPromotionalpage
);

module.exports = router;
