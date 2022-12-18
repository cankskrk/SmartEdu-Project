const User = require('../models/User');
const Category = require('../models/Category');
const Course = require('../models/Course');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);

    res.status(201).redirect('/login');
  } catch (error) {
    const errors = validationResult(req);
    for (let i = 0; i < errors.array().length; i++) {
      // Butun hatalari gosterecek!
      req.flash('Error', `${errors.array()[i].msg}`);
    }
    res.status(400).redirect('/register');
  }
};

exports.loginUser = async (req, res) => {
  try {
    await User.findOne({ email: req.body.email }, (err, user) => {
      if (user) {
        bcrypt.compare(req.body.password, user.password, (err, same) => {
          if (same) {
            // User Session
            req.session.userID = user._id;
            req.session.userRole = user.role;
            res.status(200).redirect('/users/dashboard');
          } else {
            req.flash('Error', `Your password is not correct!`);
            res.status(400).redirect('/login');
          }
        });
      } else {
        req.flash('Error', `User is not exist!`);
        res.status(400).redirect('/login');
      }
    });
  } catch {}
};

exports.logoutUser = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
};

// Get Dashboard Page
exports.getDashboardPage = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.session.userID }).populate(
      'courses'
    );
    const categories = await Category.find(); // form icin kategorileri cikarttik.
    const courses = await Course.find({ user: req.session.userID }).sort(
      '-createdAt'
    );
    const users = await User.find();

    res.status(200).render('dashboard', {
      page_name: 'dashboard',
      user,
      categories,
      courses,
      users,
    });
  } catch {
    res.status(404).send('Sifre ya da E-posta HATALI!');
  }
};

// Delete A User
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndRemove(req.params.id);
    await Course.deleteMany({ user: req.params.id }); // Kullanicinin olusturdugu kurslari da kaldiriyoruz.
    req.flash('Success', `${user.name} has been removed succcessfully!`);
    res.status(200).redirect('/users/dashboard');
  } catch (error) {
    req.flash('Error', `Something happened!`);
    res.status(400).redirect('/users/dashboard');
  }
};
