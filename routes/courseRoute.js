const express = require('express');

const courseController = require('../controllers/courseController');
const router = express.Router();

// http://localhost:3000/courses
router.route('/').get(courseController.getAllCourses);
router.route('/:id').get(courseController.getCourse);
router.route('/').post(courseController.createCourse);

module.exports = router;
