const express = require('express');

const pageController = require('../controllers/pageController');
const router = express.Router();

// http://localhost:3000
router.route('/').get(pageController.getMainPage);
router.route('/about').get(pageController.getAboutPage);
router.route('/dashboard').get(pageController.getDashboardPage);
router.route('/contact').get(pageController.getContactPage);
router.route('/register').get(pageController.getRegisterPage);
router.route('/login').get(pageController.getLoginPage);

module.exports = router;
