const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');


router.get('/exd/', apiController.getAllWorkouts);
router.get('/exd/:id', apiController.getWorkoutById);
router.get('/exd/muscle/:muscle', apiController.getWorkoutsByMuscle);
router.get('/exd/force/:force', apiController.getWorkoutsByForce);
router.get('/exd/level/:level', apiController.getWorkoutsByLevel);

module.exports = router;
