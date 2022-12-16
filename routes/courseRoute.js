const express = require('express');

const courseController = require('../controllers/courseController');
const roleMiddleware = require('../middlewares/roleMiddleware');
const router = express.Router();

// http://localhost:3000/courses
router.route('/').get(courseController.getAllCourses);
router
  .route('/')
  .post(roleMiddleware(['Teacher', 'Admin']), courseController.createCourse); // Eger kullanici ogrenci ise kurs yaratma fonksiyonunu kullanamaz
router.route('/:slug').get(courseController.getCourse);
router.route('/enroll').post(courseController.enrollCourse);
router.route('/release').post(courseController.releaseCourse);
router.route('/:slug').delete(courseController.deleteCourse);
router.route('/:slug').put(courseController.updateCourse);

module.exports = router;
