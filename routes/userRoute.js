const express = require('express');
const { body } = require('express-validator');

const authController = require('../controllers/authController');
const { deleteUser } = require('../middlewares/roleMiddleware');
const User = require('../models/User');
const router = express.Router();

// http://localhost:3000/users/
router.route('/signup').post(
  [
    body('name').not().isEmpty().withMessage('Please Enter Your Name!'),
    body('email')
      .not()
      .isEmpty()
      .withMessage('Please Enter Valid Email!')
      .custom(async (userEmail) => {
        // Eger ayni email ile kayit yapilmissa tekrar kayit yapilmayi engelleyip uyari vericek!
        const user = await User.findOne({ email: userEmail });
        if (user) {
          return Promise.reject('Email is already exists!');
        }
      }),
    body('password').not().isEmpty().withMessage('Please Enter A Password!'),
  ],
  authController.createUser
);
router
  .route('/login')
  .post(
    [
      body('email').not().isEmpty().withMessage('Please Enter Valid Email!'),
      body('password').not().isEmpty().withMessage('Please Enter A Password!'),
    ],
    authController.loginUser
  );
router.route('/logout').get(authController.logoutUser);
router.route('/dashboard').get(authController.getDashboardPage);
router.route('/:id').delete(deleteUser('Admin'), authController.deleteUser);

module.exports = router;
