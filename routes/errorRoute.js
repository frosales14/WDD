const express = require("express");
const router = express.Router();
const buildController = require("../controllers/buildController");

// Route to trigger the error page
router.get("/", (req, res, next) => {
  // Extract status code from URL query parameter
  let status = req.query.status;
  if (status === '500' || status === '501') {
    status = parseInt(status);
  } else if (status === undefined || isNaN(parseInt(status)) || status < 400 || status >= 600) {
    status = 406; // Default to 406 if status is invalid
  }
  // Redirect to /x with the specified status code
  res.redirect(`/xr?status=${status}`);
});

// Route for handling error pages at /x
router.use("/xr", (req, res, next) => {
  // Extract status code from URL query parameter
  let status = req.query.status;
  if (status === '500' || status === '501') {
    status = parseInt(status);
  } else if (status === undefined || isNaN(parseInt(status)) || status < 400 || status >= 600) {
    status = 406; // Default to 406 if status is invalid
  }
  // Delegate rendering logic to the error controller
  buildController.ErrorPage(req, res, next, status);
});

module.exports = router;
