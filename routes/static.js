const express = require('express');
const router = express.Router();

// Set up "public" folder / subfolders for static files
router.use(express.static("public"));
router.use("/css", express.static(__dirname + "public/css"));
router.use("/js", express.static(__dirname + "public/js"));
router.use("/json", express.static(__dirname + "public/json"));
router.use("/images", express.static(__dirname + "public/images"));

module.exports = router;