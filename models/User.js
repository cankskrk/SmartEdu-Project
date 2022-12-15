const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['Student', 'Teacher', 'Admin'], // Alabilecegi degerleri yazdik
    default: 'Student', // Varsayilan olarak ogrenci degerini alir
  },
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
    },
  ],
});

// Kaydetmeden once kriptoluyoruz
// UserSchema.pre('save', function (next) {
//   const user = this;
//   bcrypt.hash(user.password, 10, (err, hash) => {
//     user.password = hash;
//     next();
//   });
// });

// Kaydetmeden once kriptoluyoruz ve eger kullanici modifiye edilmisse tekrar sifrelemesini engelliyoruz.
UserSchema.pre('save', function (next) {
  const user = this;
  if (!user.isModified('password')) return next();

  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
