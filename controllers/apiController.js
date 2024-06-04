const { ObjectId } = require('mongodb');
const { RD } = require('../database/dbconfig');

const getAllWorkouts = async (req, res) => {
  try {
    const db = RD();
    const workouts = await db.collection('Exercises').find({}).toArray();
    res.status(200).json(workouts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getWorkoutById = async (req, res) => {
  try {
    const workoutId = req.params.id;
    if (!ObjectId.isValid(workoutId)) {
      return res.status(400).json({ error: 'Invalid workout ID format' });
    }

    const db = RD();
    const workout = await db.collection('Exercises').findOne({ _id: new ObjectId(workoutId) });
    if (!workout) {
      return res.status(404).json({ error: 'Workout not found' });
    }
    res.status(200).json(workout);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getWorkoutsByMuscle = async (req, res) => {
  try {
    const muscle = req.params.muscle;
    const db = RD();
    const workouts = await db.collection('Exercises').find({ primaryMuscles: muscle }).toArray();
    res.status(200).json(workouts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getWorkoutsByForce = async (req, res) => {
  try {
    const force = req.params.force;
    const db = RD();
    const workouts = await db.collection('Exercises').find({ force: force }).toArray();
    res.status(200).json(workouts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getWorkoutsByLevel = async (req, res) => {
  try {
    const level = req.params.level;
    const db = RD();
    const workouts = await db.collection('Exercises').find({ level: level }).toArray();
    res.status(200).json(workouts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllWorkouts,
  getWorkoutById,
  getWorkoutsByMuscle,
  getWorkoutsByForce,
  getWorkoutsByLevel
};
