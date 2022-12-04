const express = require('express');

const categoryController = require('../controllers/categoryController');
const router = express.Router();

// http://localhost:3000/categories
router.route('/').post(categoryController.createCategory);

module.exports = router;
