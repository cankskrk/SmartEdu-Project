const User = require('../models/User');
const Category = require('../models/Category');
const Course = require('../models/Course');
const bcrypt = require('bcrypt');

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);

    res.status(201).redirect('/login');
  } catch {
    res.status(404).json({
      status: 'fail',
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    await User.findOne({ email: req.body.email }, (err, user) => {
      if (user) {
        if (bcrypt.compare(req.body.password, user.password)) {
          // User Session
          req.session.userID = user._id;
          req.session.userRole = user.role;
          res.status(200).redirect('/users/dashboard');
        } else {
          res.status(400).redirect('/login');
        }
      } else {
        res.status(404).send('Kullanici Bulunamadi!');
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

    res.status(200).render('dashboard', {
      page_name: 'dashboard',
      user,
      categories,
      courses,
    });
  } catch {
    res.status(404).send('Sifre ya da E-posta HATALI!');
  }
};
