const User = require('../models/User');
const bcrytp = require('bcrypt');

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);

    res.status(201).json({
      status: 'success',
      user,
    });
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

    res.status(200).render('dashboard', {
      page_name: 'dashboard',
      user,
    });
  } catch {
    res.status(404).send('Sifre ya da E-posta HATALI!');
  }
};
