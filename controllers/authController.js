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
            res.status(200).redirect('/');
          } else {
            res.status(404).send('YARRRAMI YEEAA!');
          }
        });
      } else {
        res.status(404).send('YARRRAMI YEEAA OROSSSPUAAA!');
      }
    });
  } catch {}
};
