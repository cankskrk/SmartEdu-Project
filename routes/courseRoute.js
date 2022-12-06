const express = require('express');

const courseController = require('../controllers/courseController');
const roleMiddleware = require('../middlewares/roleMiddleware');
const router = express.Router();

// http://localhost:3000/courses
router.route('/').get(courseController.getAllCourses);
router.route('/:slug').get(courseController.getCourse);
router
  .route('/')
  .post(roleMiddleware(['Teacher', 'Admin']), courseController.createCourse);

module.exports = router;
