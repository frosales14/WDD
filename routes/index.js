const express = require("express");
const router = express.Router();
const staticRoute = require("./static");
const apiRoute = require("./apiRoute");
const errorRoute = require("./errorRoute");
const buildController = require("../controllers/buildController");

router.get("/", buildController.HomePage);
router.get("/ngl", buildController.NavListingPages);
router.get("/exbbp", buildController.GroupPages);
router.get("/exbft", buildController.ForcePages);
router.get("/exblvl", buildController.LevelPages);
router.get("/idvex/", buildController.ExercisePages);
router.get("/search", buildController.Search);

router.use(staticRoute);
router.use(apiRoute);
router.use(errorRoute);

module.exports = router;