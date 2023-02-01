const express = require('express');
const {
    deleteWorkout,
    getWorkout,
    getWorkouts,
    createWorkout,
    updateWorkout
} = require('../controllers/workoutController');

const requireAuth = require('../middleware/requireAuth')

const router = express.Router();

// Require Auth for all workout routes
router.use(requireAuth)

//  To get all workouts 
router.get('/',getWorkouts);

//  To get a single workout
router.get('/:id',getWorkout);

// Post a new workout
router.post('/',createWorkout );

// Delete a workout
router.delete('/:id',deleteWorkout);

// Update a Workout
router.patch('/:id',updateWorkout);

module.exports = router;