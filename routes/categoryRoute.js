const express = require('express');

const categoryController = require('../controllers/categoryController');
const { deleteUser } = require('../middlewares/roleMiddleware');
const router = express.Router();

// http://localhost:3000/categories
router.route('/').post(categoryController.createCategory);
router
  .route('/:id')
  .delete(deleteUser('Admin'), categoryController.deleteCategory);

module.exports = router;
