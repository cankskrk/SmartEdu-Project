const User = require('../models/User');
const Category = require('../models/Category');
const bcrytp = require('bcrypt');

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
    const { email, password } = req.body;
    await User.findOne({ email }, (err, user) => {
      if (user) {
        bcrytp.compare(password, user.password, (err, same) => {
          if (same) {
            // User Session
            req.session.userID = user._id;
            req.session.userRole = user.role;
            res.status(200).redirect('/users/dashboard');
          } else {
            res.status(404).send('Sifre ya da E-posta HATALI!');
          }
        });
      } else {
        res.status(404).send('Sifre ya da E-posta HATALI!');
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
    const user = await User.findOne({ _id: req.session.userID });
    const categories = await Category.find();

    res.status(200).render('dashboard', {
      page_name: 'dashboard',
      user,
      categories,
    });
  } catch {
    res.status(404).send('Sifre ya da E-posta HATALI!');
  }
};
