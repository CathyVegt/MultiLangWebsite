/**
 * Module that does the routing. This means that accessing or fetching from the mentioned URL
 * will result in a function call for the controller that is positioned afterwards. 
 * The fetch does have to be called from the host of the database, in this case: 
 * http://localhost:3000/api/v1/....
 */

const express = require('express');
const router = express.Router();
const exerciseController = require('../controllers/exerciseController');

router.get('/exercises', exerciseController.getAllExercises);
router.get('/exercises/random/:difficulty', exerciseController.getRandomExerciseByDifficulty);
//router.get('/exercises/:id', exerciseController.getExerciseById);

// Define the new route for adding an exercise
router.post('/exercises', exerciseController.addExercise);


module.exports = router;
